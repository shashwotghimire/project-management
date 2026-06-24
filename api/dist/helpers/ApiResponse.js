"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    message;
    data;
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static ok(message, data) {
        return new ApiResponse(true, message, data);
    }
    static error(message, data = null) {
        return new ApiResponse(false, message, data);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map