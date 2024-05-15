'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      // Modify the status column to add new enum values
      await queryInterface.changeColumn('Interviews', 'status', {
        type: Sequelize.ENUM('scheduled', 'accepted with original date & time', 'accepted with alternate date & time', 'cancelled by HR'),
        allowNull: false,
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
