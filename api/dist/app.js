"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const organizations_route_1 = __importDefault(require("./routes/organizations.route"));
const invitation_route_1 = __importDefault(require("./routes/invitation.route"));
const projects_route_1 = __importDefault(require("./routes/projects.route"));
const tasks_route_1 = __importDefault(require("./routes/tasks.route"));
const comments_route_1 = __importDefault(require("./routes/comments.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use("/api/auth", auth_route_1.default);
app.use("/api/organizations", organizations_route_1.default);
app.use("/api/invitations", invitation_route_1.default);
app.use("/api/organizations/:orgId/projects", projects_route_1.default);
app.use("/api/organizations/:orgId/projects/:projectId/tasks", tasks_route_1.default);
app.use("/api/organizations/:orgId/projects/:projectId/tasks/:taskId/comments", comments_route_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map