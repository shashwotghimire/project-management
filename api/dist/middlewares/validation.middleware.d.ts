import { NextFunction, Request, Response } from "express";
import z from "zod";
export declare const validate: (schema: z.ZodType<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validation.middleware.d.ts.map