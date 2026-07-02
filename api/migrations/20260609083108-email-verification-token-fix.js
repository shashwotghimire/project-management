'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['email_verification_token'],
      type: 'unique',
      name: 'users_email_verification_token_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_email_verification_token_unique');
  },
};
