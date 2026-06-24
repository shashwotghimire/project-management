"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.verifyEmail = exports.registerUser = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const auth_service_1 = require("../services/auth.service");
const ApiResponse_1 = require("../helpers/ApiResponse");
const ApiError_1 = require("../helpers/ApiError");
exports.registerUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const result = await (0, auth_service_1.registerService)({ username, email, password });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(true, "User registered successfully", result));
});
exports.verifyEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const { token } = req.query;
    if (typeof token !== "string") {
        return res
            .status(400)
            .json(new ApiError_1.ApiError(400, "Invalid token", "Email verification token must be a string"));
    }
    const result = await (0, auth_service_1.verifyEmailService)(token);
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Email verified successfully", result));
});
exports.loginUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, auth_service_1.loginUserService)({ email, password });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Login successful", result));
});
exports.getUserProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user.id;
    const user = await (0, auth_service_1.getUserProfileService)(userId);
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "User profile retrieved successfully", user));
});
//# sourceMappingURL=auth.controller.js.map