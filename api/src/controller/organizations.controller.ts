import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createOrganizationService,
  deleteOrganizationService,
  getUsersOrganizationsService,
  updateOrganizationService,
} from "../services/organizations.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { ApiError } from "../helpers/ApiError";
import { isString } from "../helpers/check-string.helper";

export const createOrganizaiton = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { name, logoUrl, description, websiteUrl } = req.body;
    const userId = req.user.id;
    const org = await createOrganizationService({
      name,
      adminId: userId,
      logoUrl,
      description,
      websiteUrl,
    });
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

export const updateOrganization = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { orgId } = req.params;
    if (!orgId || typeof orgId !== "string") {
      throw new ApiError(
        400,
        "Organization ID is required",
        "Organization ID is required",
      );
    }
    const { name, logoUrl, description, websiteUrl } = req.body;
    const userId = req.user.id;
    const updatedOrg = await updateOrganizationService({
      orgId,
      adminId: userId,
      name,
      logoUrl,
      description,
      websiteUrl,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Organization updated successfully", updatedOrg),
      );
  },
);

export const deleteOrganization = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { orgId } = req.params;
    const orgID = isString(orgId);
    const userId = req.user.id;
    await deleteOrganizationService({
      orgId: orgID,
      adminId: userId,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Organization deleted successfully", null));
  },
);
