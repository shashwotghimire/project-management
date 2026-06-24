"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGravatarUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateGravatarUrl = (email) => {
    const hash = crypto_1.default
        .createHash("md5")
        .update(email.trim().toLowerCase())
        .digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
};
exports.generateGravatarUrl = generateGravatarUrl;
//# sourceMappingURL=gravatar.service.js.map