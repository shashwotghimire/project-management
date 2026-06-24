declare class ApiError extends Error {
    statusCode: number;
    error: string;
    validationError?: any[];
    constructor(statusCode: number, message: string, error: string, validationError?: any[]);
}
export { ApiError };
//# sourceMappingURL=ApiError.d.ts.map