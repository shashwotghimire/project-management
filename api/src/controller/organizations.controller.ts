import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createOrganizationService,
  getUsersOrganizationsService,
} from "../services/organizations.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { parse } from "dotenv";

export const createOrganizaiton = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { name } = req.body;
    const userId = req.user.id;
    const org = await createOrganizationService({ name, adminId: userId });
    return res
      .status(201)
      .json(new ApiResponse(true, "Organization created successfully", org));
  },
);

export const getUsersOrganizations = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const query = (req.query.query as string) || "";
    const orgs = await getUsersOrganizationsService({
      userId,
      page,
      limit,
      query,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Organizations fetched successfully", orgs));
  },
);
