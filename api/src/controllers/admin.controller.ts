import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getOrganizationsForAdminService,
  getOrganizationDetailsForAdminService,
  setOrganizationBlockedStatusService,
  getUsersForAdminService,
  getPlatformStatsService,
} from "../services/admin.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";

export const getOrganizationsForAdmin = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const query = (req.query.query as string) || "";

    const result = await getOrganizationsForAdminService({
      page,
      limit,
      query,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Organizations fetched successfully", result),
      );
  },
);

export const getOrganizationDetailsForAdmin = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const result = await getOrganizationDetailsForAdminService(orgId);
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Organization details fetched successfully",
          result,
        ),
      );
  },
);

export const blockOrganization = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const result = await setOrganizationBlockedStatusService(orgId, true);
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Organization suspended successfully", result),
      );
  },
);

export const unblockOrganization = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const result = await setOrganizationBlockedStatusService(orgId, false);
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Organization unsuspended successfully", result),
      );
  },
);

export const getUsersForAdmin = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const query = (req.query.query as string) || "";

    const result = await getUsersForAdminService({ page, limit, query });
    return res
      .status(200)
      .json(new ApiResponse(true, "Users fetched successfully", result));
  },
);

export const getPlatformStats = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const result = await getPlatformStatsService();
    return res
      .status(200)
      .json(new ApiResponse(true, "Platform stats fetched successfully", result));
  },
);
