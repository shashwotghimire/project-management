"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = isString;
function isString(value) {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
    else if (value.trim() === "") {
        throw new Error("String cannot be empty");
    }
    return value;
}
//# sourceMappingURL=check-string.helper.js.map