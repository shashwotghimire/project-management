import { ApiError } from "../helpers/ApiError";
import { comparePassword, hashPassword } from "../helpers/hash.helper";
import { generateAccessToken } from "../helpers/jwt.helper";
import {
  createNewUser,
  findUserByEmailVerificationToken,
  findUserByEmail,
  updateUserEmailVerified,
  findUserById,
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

export const getUserProfileService = async (userId: string) => {
  const key = `user:${userId}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "Not found", "User not found");
  }
  await redis.set(key, JSON.stringify(user), "EX", 300);
  return user;
};
