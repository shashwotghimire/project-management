import { NextFunction, Request, Response, RequestHandler } from "express";
declare const asyncHandler: <T extends Request = Request>(fn: (req: T, res: Response, next: NextFunction) => Promise<unknown>) => RequestHandler;
export default asyncHandler;
//# sourceMappingURL=asyncHandler.d.ts.map