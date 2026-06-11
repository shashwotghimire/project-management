'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('organizations', 'logo_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('organizations', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('organizations', 'website_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('organizations', 'logo_url');
    await queryInterface.removeColumn('organizations', 'description');
    await queryInterface.removeColumn('organizations', 'website_url');
  },
};
