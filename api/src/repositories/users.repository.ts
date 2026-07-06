import { User } from "../models/users.model";
import { UserRoles } from "../types/roles";
import { Op } from "sequelize";

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

export const updateUser = async (
  userId: string,
  data: { username?: string; password?: string },
) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  if (data.username) user.username = data.username;
  if (data.password) user.password = data.password;
  await user.save();
  return user;
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

export const updateUserAvatar = async (userId: string, gravatarUrl: string) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  user.gravatarUrl = gravatarUrl;
  await user.save();
  return user;
};

// Super Admin repository functions
export const getAllUsersForAdmin = async ({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query?: string;
}) => {
  const whereClause: any = {};
  if (query?.trim()) {
    whereClause[Op.or] = [
      { username: { [Op.iLike]: `%${query.trim()}%` } },
      { email: { [Op.iLike]: `%${query.trim()}%` } },
    ];
  }

  const { rows, count } = await User.findAndCountAll({
    where: whereClause,
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "DESC"]],
  });

  return {
    users: rows,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit),
    },
  };
};
