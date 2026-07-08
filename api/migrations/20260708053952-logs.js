'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Org-level activity log
    await queryInterface.createTable('org_activity_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      org_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'organizations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      actor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      action: {
        type: Sequelize.ENUM(
          'org_updated',
          'member_joined',
          'member_removed',
          'project_created',
          'project_deleted',
          'member_added_to_project',
          'member_removed_from_project',
          'invitation_sent',
          'invitation_accepted'
        ),
        allowNull: false,
      },
      target_user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      meta: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('org_activity_logs', ['org_id'], {
      name: 'org_activity_logs_org_id_idx',
    });
    await queryInterface.addIndex('org_activity_logs', ['org_id', 'created_at'], {
      name: 'org_activity_logs_org_id_created_at_idx',
    });

    // Task-level activity log
    await queryInterface.createTable('task_activity_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      task_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'tasks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      actor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      action: {
        type: Sequelize.ENUM(
          'task_created',
          'task_assigned',
          'task_reassigned',
          'task_unassigned',
          'status_changed',
          'priority_changed',
          'due_date_changed',
          'title_changed',
          'description_changed',
          'comment_added',
          'comment_edited',
          'comment_deleted',
          'task_completed',
          'task_reopened'
        ),
        allowNull: false,
      },
      meta: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('task_activity_logs', ['task_id'], {
      name: 'task_activity_logs_task_id_idx',
    });
    await queryInterface.addIndex('task_activity_logs', ['task_id', 'created_at'], {
      name: 'task_activity_logs_task_id_created_at_idx',
    });
    await queryInterface.addIndex('task_activity_logs', ['project_id'], {
      name: 'task_activity_logs_project_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('task_activity_logs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_task_activity_logs_action";');

    await queryInterface.dropTable('org_activity_logs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_org_activity_logs_action";');
  },
};
