import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "REST API for the Project Management platform",
    },
    servers: [{ url: "/api", description: "API base" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            data: {},
          },
        },
        PaginationMeta: {
          type: "object",
          properties: {
            total: { type: "integer" },
            page: { type: "integer" },
            limit: { type: "integer" },
            totalPages: { type: "integer" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            username: { type: "string" },
            email: { type: "string", format: "email" },
            emailVerified: { type: "boolean" },
            role: { type: "string", enum: ["user", "superadmin"] },
            gravatarUrl: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Organization: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            adminId: { type: "string", format: "uuid" },
            blocked: { type: "boolean" },
            logoUrl: { type: "string", nullable: true },
            description: { type: "string", nullable: true },
            websiteUrl: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            organizationId: { type: "string", format: "uuid" },
            createdBy: { type: "string", format: "uuid" },
            logoUrl: { type: "string", nullable: true },
            status: { type: "string", enum: ["active", "archived"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string", nullable: true },
            projectId: { type: "string", format: "uuid" },
            createdBy: { type: "string", format: "uuid" },
            assignedTo: { type: "string", format: "uuid", nullable: true },
            assignedBy: { type: "string", format: "uuid" },
            status: { type: "string", enum: ["todo", "in_progress", "completed"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            position: { type: "integer", nullable: true },
            dueDate: { type: "string", format: "date", nullable: true },
            completedAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            content: { type: "string" },
            taskId: { type: "string", format: "uuid" },
            projectId: { type: "string", format: "uuid" },
            organizationId: { type: "string", format: "uuid" },
            authorId: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Channel: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            projectId: { type: "string", format: "uuid" },
            name: { type: "string" },
          },
        },
        Message: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            channelId: { type: "string", format: "uuid" },
            senderId: { type: "string", format: "uuid" },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Notification: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            orgId: { type: "string", format: "uuid", nullable: true },
            projectId: { type: "string", format: "uuid", nullable: true },
            title: { type: "string" },
            message: { type: "string" },
            isRead: { type: "boolean" },
            href: { type: "string", nullable: true },
          },
        },
        Invitation: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            organizationId: { type: "string", format: "uuid" },
            invitedBy: { type: "string", format: "uuid" },
            status: { type: "string", enum: ["pending", "accepted", "declined"] },
          },
        },
        OrgActivityLog: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            orgId: { type: "string", format: "uuid" },
            actorId: { type: "string", format: "uuid" },
            action: {
              type: "string",
              enum: [
                "org_updated", "member_joined", "member_removed",
                "project_created", "project_deleted",
                "member_added_to_project", "member_removed_from_project",
                "invitation_sent", "invitation_accepted",
              ],
            },
            targetUserId: { type: "string", format: "uuid", nullable: true },
            projectId: { type: "string", format: "uuid", nullable: true },
            meta: { type: "object", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        TaskActivityLog: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            taskId: { type: "string", format: "uuid" },
            projectId: { type: "string", format: "uuid" },
            actorId: { type: "string", format: "uuid" },
            action: {
              type: "string",
              enum: [
                "task_created", "task_assigned", "task_reassigned", "task_unassigned",
                "status_changed", "priority_changed", "due_date_changed",
                "title_changed", "description_changed",
                "comment_added", "comment_edited", "comment_deleted",
                "task_completed", "task_reopened",
              ],
            },
            meta: { type: "object", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/check": {
        get: {
          tags: ["Health"],
          summary: "Health check",
          security: [],
          responses: {
            "200": {
              description: "API is running",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "email", "password"],
                  properties: {
                    username: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "User registered. Verification email sent." },
            "400": { description: "Validation error or email already in use" },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "JWT access token",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "object",
                            properties: { accessToken: { type: "string" } },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": { description: "Invalid credentials or email not verified" },
          },
        },
      },
      "/auth/verify-email": {
        get: {
          tags: ["Auth"],
          summary: "Verify email address",
          security: [],
          parameters: [
            { name: "token", in: "query", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "Email verified" },
            "400": { description: "Invalid or expired token" },
          },
        },
      },
      "/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get current user profile",
          responses: {
            "200": {
              description: "User profile",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      { properties: { data: { $ref: "#/components/schemas/User" } } },
                    ],
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ["Auth"],
          summary: "Update current user profile",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    currentPassword: { type: "string" },
                    newPassword: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Profile updated" },
            "400": { description: "Validation error" },
          },
        },
      },
      "/auth/me/avatar": {
        patch: {
          tags: ["Auth"],
          summary: "Upload user avatar",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: { file: { type: "string", format: "binary" } },
                },
              },
            },
          },
          responses: {
            "200": { description: "Avatar uploaded, gravatarUrl updated" },
          },
        },
      },
      "/admin/organizations": {
        get: {
          tags: ["Admin"],
          summary: "List all organizations (superadmin)",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "query", in: "query", schema: { type: "string" } },
          ],
          responses: { "200": { description: "Paginated organizations" } },
        },
      },
      "/admin/organizations/{orgId}": {
        get: {
          tags: ["Admin"],
          summary: "Get organization details (superadmin)",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Organization details" } },
        },
      },
      "/admin/organizations/{orgId}/block": {
        patch: {
          tags: ["Admin"],
          summary: "Block an organization (superadmin)",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Organization blocked" } },
        },
      },
      "/admin/organizations/{orgId}/unblock": {
        patch: {
          tags: ["Admin"],
          summary: "Unblock an organization (superadmin)",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Organization unblocked" } },
        },
      },
      "/admin/users": {
        get: {
          tags: ["Admin"],
          summary: "List all users (superadmin)",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "query", in: "query", schema: { type: "string" } },
          ],
          responses: { "200": { description: "Paginated users" } },
        },
      },
      "/admin/stats": {
        get: {
          tags: ["Admin"],
          summary: "Get platform-wide statistics (superadmin)",
          responses: { "200": { description: "Platform stats" } },
        },
      },
      "/organizations": {
        get: {
          tags: ["Organizations"],
          summary: "List organizations for the current user",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "query", in: "query", schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Paginated organizations",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Organization" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Organizations"],
          summary: "Create an organization",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name"],
                  properties: {
                    name: { type: "string" },
                    logoUrl: { type: "string", nullable: true },
                    description: { type: "string", nullable: true },
                    websiteUrl: { type: "string", nullable: true },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Organization created" } },
        },
      },
      "/organizations/{orgId}": {
        get: {
          tags: ["Organizations"],
          summary: "Get organization by ID",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Organization" } },
        },
        patch: {
          tags: ["Organizations"],
          summary: "Update organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    logoUrl: { type: "string" },
                    description: { type: "string" },
                    websiteUrl: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Organization updated" } },
        },
        delete: {
          tags: ["Organizations"],
          summary: "Delete organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Organization deleted" } },
        },
      },
      "/organizations/{orgId}/members": {
        get: {
          tags: ["Organizations"],
          summary: "Get all members of an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Members list" } },
        },
      },
      "/organizations/{orgId}/members/{userId}": {
        delete: {
          tags: ["Organizations"],
          summary: "Remove a member from an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "userId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Member removed" } },
        },
      },
      "/organizations/{orgId}/my-tasks": {
        get: {
          tags: ["Organizations"],
          summary: "Get tasks assigned to the current user in an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Tasks list" } },
        },
      },
      "/organizations/{orgId}/calendar-tasks": {
        get: {
          tags: ["Organizations"],
          summary: "Get tasks for the current user formatted for calendar view",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Calendar tasks" } },
        },
      },
      "/organizations/{orgId}/logo": {
        patch: {
          tags: ["Organizations"],
          summary: "Upload organization logo",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: { file: { type: "string", format: "binary" } },
                },
              },
            },
          },
          responses: { "200": { description: "Logo uploaded" } },
        },
      },
      "/organizations/{orgId}/activity-logs": {
        get: {
          tags: ["Activity Logs"],
          summary: "Get organization activity logs",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          ],
          responses: {
            "200": {
              description: "Paginated activity logs",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrgActivityLog" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/organizations/{orgId}/notifications": {
        get: {
          tags: ["Notifications"],
          summary: "Get notifications for the current user in an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            "200": {
              description: "Notifications list",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Notification" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/organizations/{orgId}/notifications/{notificationId}": {
        delete: {
          tags: ["Notifications"],
          summary: "Delete a notification",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "notificationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Notification deleted" } },
        },
      },
      "/organizations/{orgId}/projects": {
        get: {
          tags: ["Projects"],
          summary: "List projects in an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "search", in: "query", schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Paginated projects",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Project" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Projects"],
          summary: "Create a project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name"],
                  properties: {
                    name: { type: "string" },
                    logoUrl: { type: "string", nullable: true },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Project created" } },
        },
      },
      "/organizations/{orgId}/projects/dashboard": {
        get: {
          tags: ["Projects"],
          summary: "Get dashboard projects for the current user",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Dashboard projects" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}": {
        get: {
          tags: ["Projects"],
          summary: "Get project by ID",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Project details" } },
        },
        patch: {
          tags: ["Projects"],
          summary: "Update project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    logoUrl: { type: "string" },
                    status: { type: "string", enum: ["active", "archived"] },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Project updated" } },
        },
        delete: {
          tags: ["Projects"],
          summary: "Delete project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Project deleted" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/members": {
        get: {
          tags: ["Projects"],
          summary: "Get project members",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Project members" } },
        },
        post: {
          tags: ["Projects"],
          summary: "Add member to project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["userId"],
                  properties: { userId: { type: "string", format: "uuid" } },
                },
              },
            },
          },
          responses: { "200": { description: "Member added" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/members/{userId}": {
        delete: {
          tags: ["Projects"],
          summary: "Remove member from project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "userId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Member removed" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/task-stats": {
        get: {
          tags: ["Projects"],
          summary: "Get task statistics for a project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Task stats" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/logo": {
        patch: {
          tags: ["Projects"],
          summary: "Upload project logo",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: { file: { type: "string", format: "binary" } },
                },
              },
            },
          },
          responses: { "200": { description: "Logo uploaded" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "List tasks in a project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          ],
          responses: {
            "200": {
              description: "Paginated tasks",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Task" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Tasks"],
          summary: "Create a task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string", nullable: true },
                    assignedTo: { type: "string", format: "uuid", nullable: true },
                    status: { type: "string", enum: ["todo", "in_progress", "completed"] },
                    priority: { type: "string", enum: ["low", "medium", "high"] },
                    dueDate: { type: "string", format: "date", nullable: true },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Task created" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/my-tasks": {
        get: {
          tags: ["Tasks"],
          summary: "Get tasks assigned to the current user in a project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Tasks list" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}": {
        get: {
          tags: ["Tasks"],
          summary: "Get task by ID",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Task details" } },
        },
        patch: {
          tags: ["Tasks"],
          summary: "Update task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    status: { type: "string", enum: ["todo", "in_progress", "completed"] },
                    priority: { type: "string", enum: ["low", "medium", "high"] },
                    dueDate: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Task updated" } },
        },
        delete: {
          tags: ["Tasks"],
          summary: "Delete task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Task deleted" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/status": {
        patch: {
          tags: ["Tasks"],
          summary: "Update task status",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: { type: "string", enum: ["todo", "in_progress", "completed"] },
                    position: { type: "integer", nullable: true },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Status updated" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/position": {
        patch: {
          tags: ["Tasks"],
          summary: "Update task position (drag-and-drop ordering)",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["position"],
                  properties: { position: { type: "integer" } },
                },
              },
            },
          },
          responses: { "200": { description: "Position updated" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/reassign": {
        patch: {
          tags: ["Tasks"],
          summary: "Reassign task to another user",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["newUserId"],
                  properties: { newUserId: { type: "string", format: "uuid" } },
                },
              },
            },
          },
          responses: { "200": { description: "Task reassigned" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/logs": {
        get: {
          tags: ["Activity Logs"],
          summary: "Get activity logs for a task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          ],
          responses: {
            "200": {
              description: "Paginated task activity logs",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/TaskActivityLog" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/comments": {
        get: {
          tags: ["Comments"],
          summary: "List comments on a task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          ],
          responses: {
            "200": {
              description: "Paginated comments",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Comment" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Comments"],
          summary: "Create a comment on a task",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["content"],
                  properties: { content: { type: "string" } },
                },
              },
            },
          },
          responses: { "201": { description: "Comment created" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/comments/{commentId}": {
        patch: {
          tags: ["Comments"],
          summary: "Update a comment",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "commentId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["content"],
                  properties: { content: { type: "string" } },
                },
              },
            },
          },
          responses: { "200": { description: "Comment updated" } },
        },
        delete: {
          tags: ["Comments"],
          summary: "Delete a comment",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "commentId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Comment deleted" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/channels": {
        get: {
          tags: ["Channels"],
          summary: "List channels in a project",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            "200": {
              description: "Channels list",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Channel" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Channels"],
          summary: "Create a channel",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name"],
                  properties: { name: { type: "string" } },
                },
              },
            },
          },
          responses: { "201": { description: "Channel created" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/channels/{channelId}": {
        get: {
          tags: ["Channels"],
          summary: "Get channel by ID",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "channelId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Channel details" } },
        },
        patch: {
          tags: ["Channels"],
          summary: "Update channel",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "channelId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name"],
                  properties: { name: { type: "string" } },
                },
              },
            },
          },
          responses: { "200": { description: "Channel updated" } },
        },
        delete: {
          tags: ["Channels"],
          summary: "Delete channel",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "channelId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Channel deleted" } },
        },
      },
      "/organizations/{orgId}/projects/{projectId}/channels/{channelId}/messages": {
        get: {
          tags: ["Channels"],
          summary: "Get messages in a channel",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "channelId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            "200": {
              description: "Messages list",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Message" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Channels"],
          summary: "Send a message to a channel",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
            { name: "channelId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["content"],
                  properties: { content: { type: "string" } },
                },
              },
            },
          },
          responses: { "201": { description: "Message sent" } },
        },
      },
      "/invitations/details": {
        get: {
          tags: ["Invitations"],
          summary: "Get invitation details by token (no auth required)",
          security: [],
          parameters: [
            { name: "token", in: "query", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Invitation details",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      { properties: { data: { $ref: "#/components/schemas/Invitation" } } },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/invitations": {
        post: {
          tags: ["Invitations"],
          summary: "Send an invitation to join an organization",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "organizationId"],
                  properties: {
                    email: { type: "string", format: "email" },
                    organizationId: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Invitation sent" } },
        },
      },
      "/invitations/respond": {
        post: {
          tags: ["Invitations"],
          summary: "Accept or decline an invitation",
          parameters: [
            { name: "token", in: "query", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["response"],
                  properties: {
                    response: { type: "string", enum: ["accepted", "declined"] },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Invitation response recorded" } },
        },
      },
      "/ai/{orgId}/summary": {
        get: {
          tags: ["AI"],
          summary: "Get cached AI dashboard summary for an organization",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            "200": {
              description: "AI summary",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        properties: {
                          data: {
                            type: "object",
                            properties: { content: { type: "string" } },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/ai/{orgId}/summary/regenerate": {
        post: {
          tags: ["AI"],
          summary: "Force regenerate AI dashboard summary",
          parameters: [
            { name: "orgId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: { "200": { description: "Summary regenerated" } },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
