export declare class ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
    constructor(success: boolean, message: string, data: T);
    static ok<T>(message: string, data: T): ApiResponse<T>;
    static error<T = null>(message: string, data?: T): ApiResponse<T>;
}
//# sourceMappingURL=ApiResponse.d.ts.map