import { User } from "../models/users.model";
import { ApiError } from "../helpers/ApiError";
import { comparePassword, hashPassword } from "../helpers/hash.helper";
import { generateAccessToken } from "../helpers/jwt.helper";
import { uploadToS3, getS3PresignedUrl, deleteFromS3 } from "./s3.service";
import {
  createNewUser,
  findUserByEmailVerificationToken,
  findUserByEmail,
  updateUserEmailVerified,
  findUserById,
  updateUser,
  updateUserAvatar,
} from "../repositories/users.repository";
import { createRandomToken } from "../utils/crypto.utils";
import { verifyEmailTemplate } from "../utils/email-template.utils";
import { sendEmail } from "./email.service";
import { generateGravatarUrl } from "./gravatar.service";
import redis from "../configs/redis-client.config";
import { emailQueue } from "../queues/email.queue";

export const registerService = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  const hashedPassword = await hashPassword(data.password);
  const userExists = await findUserByEmail(data.email);
  if (userExists) {
    throw new ApiError(400, "Bad request", "Email already in use");
  }
  const emailVerificationToken = createRandomToken(16);
  const gravatarUrl = generateGravatarUrl(data.email);
  const user = await createNewUser({
    username: data.username,
    password: hashedPassword,
    email: data.email,
    role: "user",
    emailVerificationToken,
    gravatarUrl,
  });
  // sendEmail(
  //   user.email,
  //   "Verify your email",
  //   verifyEmailTemplate(user.username, emailVerificationToken),
  // ).catch((error) => {
  //   console.error("Failed to send verification email:", error);
  // });
  await emailQueue.add(
    "verify-email",
    {
      to: user.email,
      subject: "Verify your email",
      html: verifyEmailTemplate(user.username, emailVerificationToken),
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
  return "User registered successfully. Verify your email to log in.";
};

export const verifyEmailService = async (token: string) => {
  const user = await findUserByEmailVerificationToken(token);
  if (!user) {
    throw new ApiError(400, "Bad request", "Invalid email verification token");
  }
  if (user.emailVerified) {
    throw new ApiError(
      400,
      "Bad request",
      "Email already verified. Please log in.",
    );
  }
  await updateUserEmailVerified(user.id);
  return "Email verified successfully. You can now log in.";
};

export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new ApiError(400, "Bad request", "Invalid email or password");
  }
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Bad request", "Invalid email or password");
  }
  if (!user.emailVerified) {
    throw new ApiError(
      400,
      "Bad request",
      "Email not verified. Please verify your email to log in.",
    );
  }
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    name: user.username,
    role: user.role,
    isEmailVerified: user.emailVerified,
  });
  return { user, accessToken };
};

export const updateUserProfileService = async (
  userId: string,
  data: { username?: string; currentPassword?: string; newPassword?: string },
) => {
  const user = await User.scope("withPassword").findByPk(userId);
  if (!user) throw new ApiError(404, "Not found", "User not found");

  const updates: { username?: string; password?: string } = {};

  if (data.username) {
    updates.username = data.username;
  }

  if (data.newPassword) {
    if (!data.currentPassword) {
      throw new ApiError(
        400,
        "Bad request",
        "Current password is required to set a new password",
      );
    }
    const isValid = await comparePassword(data.currentPassword, user.password);
    if (!isValid) {
      throw new ApiError(400, "Bad request", "Current password is incorrect");
    }
    updates.password = await hashPassword(data.newPassword);
  }

  const updated = await updateUser(userId, updates);
  const key = `user:${userId}`;
  await redis.del(key);
  return updated;
};

export const getUserProfileService = async (userId: string) => {
  const cacheKey = `user:${userId}`;
  const cached = await redis.get(cacheKey);
  let plain: Record<string, unknown>;

  if (cached) {
    plain = JSON.parse(cached);
  } else {
    const user = await findUserById(userId);
    if (!user) throw new ApiError(404, "Not found", "User not found");
    plain = user.toJSON() as Record<string, unknown>;
    await redis.set(cacheKey, JSON.stringify(plain), "EX", 300);
  }

  if (typeof plain.gravatarUrl === "string" && plain.gravatarUrl.startsWith("uploads/")) {
    plain.gravatarUrl = await getS3PresignedUrl(plain.gravatarUrl);
  }
  return plain;
};

export const uploadUserAvatarService = async (userId: string, file: Express.Multer.File) => {
  const user = await findUserById(userId);
  if (!user) throw new ApiError(404, "User not found", "User not found");

  const oldKey = user.gravatarUrl?.startsWith("uploads/") ? user.gravatarUrl : null;

  const { key } = await uploadToS3(file);
  const updated = await updateUserAvatar(userId, key);

  if (oldKey) deleteFromS3(oldKey).catch(() => {});

  await redis.del(`user:${userId}`);
  const url = await getS3PresignedUrl(key);
  return { user: updated, url };
};
