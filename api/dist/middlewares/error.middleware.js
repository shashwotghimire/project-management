"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../helpers/ApiError");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    let statusCode = 500;
    let message = "Error processing request";
    let error = "Internal server error";
    let validationError = undefined;
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        return res.status(statusCode).json({
            success: false,
            error: "Validation Error, invalid request payload",
            message: "Invalid data",
            validationError: err.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
    }
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
            ...(err.validationError && { validationErrors: err.validationError }),
        });
    }
    //500 for anything else
    return res.status(500).json({
        success: false,
        message: "Error processing request",
        error: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map