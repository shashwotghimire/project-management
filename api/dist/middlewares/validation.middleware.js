"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map