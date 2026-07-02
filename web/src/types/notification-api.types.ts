export interface Notification {
  id: string;
  userId: string;
  orgId: string | null;
  projectId: string | null;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersNotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}
