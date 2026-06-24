"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserEmailVerified = exports.findUserByEmailVerificationToken = exports.createNewUser = exports.findUserById = exports.findUserByEmail = void 0;
const users_model_1 = require("../models/users.model");
const findUserByEmail = (email) => {
    return users_model_1.User.scope("withPassword").findOne({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => {
    return users_model_1.User.findByPk(id);
};
exports.findUserById = findUserById;
const createNewUser = (data) => {
    return users_model_1.User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        emailVerificationToken: data.emailVerificationToken,
        gravatarUrl: data.gravatarUrl,
    });
};
exports.createNewUser = createNewUser;
const findUserByEmailVerificationToken = (token) => {
    return users_model_1.User.findOne({ where: { emailVerificationToken: token } });
};
exports.findUserByEmailVerificationToken = findUserByEmailVerificationToken;
const updateUserEmailVerified = async (userId) => {
    return users_model_1.User.update({
        emailVerified: true,
        emailVerificationToken: null,
    }, {
        where: { id: userId },
    });
};
exports.updateUserEmailVerified = updateUserEmailVerified;
//# sourceMappingURL=users.repository.js.map