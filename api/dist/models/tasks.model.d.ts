import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { TaskPriority, TaskStatus } from "../types/tasks";
export declare class Tasks extends Model<InferAttributes<Tasks>, InferCreationAttributes<Tasks>> {
    id: CreationOptional<string>;
    title: string;
    description: CreationOptional<string>;
    createdBy: ForeignKey<string>;
    assignedTo: ForeignKey<string>;
    assignedBy: ForeignKey<string>;
    projectId: ForeignKey<string>;
    status: CreationOptional<TaskStatus>;
    priority: CreationOptional<TaskPriority>;
    position: CreationOptional<number>;
    dueDate: CreationOptional<string>;
    completedAt: CreationOptional<string>;
}
//# sourceMappingURL=tasks.model.d.ts.map