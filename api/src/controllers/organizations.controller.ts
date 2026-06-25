import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createOrganizationService,
  deleteOrganizationService,
  getAllMembersOfOrgService,
  getOrgByIdService,
  getUsersOrganizationsService,
  removeOrgMemberService,
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

export const getOrgById = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = req.params.orgId;
    const orgID = isString(orgId);
    const org = await getOrgByIdService(orgID, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(true, "Organization fetched successfully", org));
  },
);

export const removeOrgMember = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const targetUserId = isString(req.params.userId);
    const requesterId = req.user.id;

    await removeOrgMemberService({ orgId, targetUserId, requesterId });

    return res
      .status(200)
      .json(new ApiResponse(true, "Member removed from organization successfully", null));
  },
);

export const getAllMembersOfOrg = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = req.params.orgId;
    const orgID = isString(orgId);
    const members = await getAllMembersOfOrgService(orgID, req.user.id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Organization members fetched successfully",
          members,
        ),
      );
  },
);
