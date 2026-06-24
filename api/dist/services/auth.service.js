"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileService = exports.loginUserService = exports.verifyEmailService = exports.registerService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const hash_helper_1 = require("../helpers/hash.helper");
const jwt_helper_1 = require("../helpers/jwt.helper");
const users_repository_1 = require("../repositories/users.repository");
const crypto_utils_1 = require("../utils/crypto.utils");
const email_template_utils_1 = require("../utils/email-template.utils");
const email_service_1 = require("./email.service");
const gravatar_service_1 = require("./gravatar.service");
const registerService = async (data) => {
    const hashedPassword = await (0, hash_helper_1.hashPassword)(data.password);
    const userExists = await (0, users_repository_1.findUserByEmail)(data.email);
    if (userExists) {
        throw new ApiError_1.ApiError(400, "Bad request", "Email already in use");
    }
    const emailVerificationToken = (0, crypto_utils_1.createRandomToken)(16);
    const gravatarUrl = (0, gravatar_service_1.generateGravatarUrl)(data.email);
    const user = await (0, users_repository_1.createNewUser)({
        username: data.username,
        password: hashedPassword,
        email: data.email,
        role: "user",
        emailVerificationToken,
        gravatarUrl,
    });
    (0, email_service_1.sendEmail)(user.email, "Verify your email", (0, email_template_utils_1.verifyEmailTemplate)(user.username, emailVerificationToken)).catch((error) => {
        console.error("Failed to send verification email:", error);
    });
    return "User registered successfully. Verify your email to log in.";
};
exports.registerService = registerService;
const verifyEmailService = async (token) => {
    const user = await (0, users_repository_1.findUserByEmailVerificationToken)(token);
    if (!user) {
        throw new ApiError_1.ApiError(400, "Bad request", "Invalid email verification token");
    }
    if (user.emailVerified) {
        throw new ApiError_1.ApiError(400, "Bad request", "Email already verified. Please log in.");
    }
    await (0, users_repository_1.updateUserEmailVerified)(user.id);
    return "Email verified successfully. You can now log in.";
};
exports.verifyEmailService = verifyEmailService;
const loginUserService = async (data) => {
    const user = await (0, users_repository_1.findUserByEmail)(data.email);
    if (!user) {
        throw new ApiError_1.ApiError(400, "Bad request", "Invalid email or password");
    }
    const isPasswordValid = await (0, hash_helper_1.comparePassword)(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.ApiError(400, "Bad request", "Invalid email or password");
    }
    if (!user.emailVerified) {
        throw new ApiError_1.ApiError(400, "Bad request", "Email not verified. Please verify your email to log in.");
    }
    const accessToken = (0, jwt_helper_1.generateAccessToken)({
        id: user.id,
        email: user.email,
        name: user.username,
        role: user.role,
        isEmailVerified: user.emailVerified,
    });
    return { user, accessToken };
};
exports.loginUserService = loginUserService;
const getUserProfileService = async (userId) => {
    const user = await (0, users_repository_1.findUserById)(userId);
    if (!user) {
        throw new ApiError_1.ApiError(404, "Not found", "User not found");
    }
    return user;
};
exports.getUserProfileService = getUserProfileService;
//# sourceMappingURL=auth.service.js.map