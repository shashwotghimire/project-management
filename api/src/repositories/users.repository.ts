import { User } from "../models/users.model";
import { UserRoles } from "../types/roles";

export const findUserByEmail = (email: string) => {
  return User.scope("withPassword").findOne({ where: { email } });
};

export const findUserById = (id: string) => {
  return User.findByPk(id);
};

export const createNewUser = (data: {
  username: string;
  email: string;
  password: string;
  role: UserRoles;
  emailVerificationToken?: string;
  gravatarUrl?: string;
}) => {
  return User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role,
    emailVerificationToken: data.emailVerificationToken,
    gravatarUrl: data.gravatarUrl,
  });
};

export const findUserByEmailVerificationToken = (token: string) => {
  return User.findOne({ where: { emailVerificationToken: token } });
};

export const updateUserEmailVerified = async (userId: string) => {
  return User.update(
    {
      emailVerified: true,
      emailVerificationToken: null,
    },
    {
      where: { id: userId },
    },
  );
};
