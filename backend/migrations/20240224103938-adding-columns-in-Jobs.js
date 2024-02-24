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
    await queryInterface.addColumn('Jobs', 'salary', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Jobs', 'job_status', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Jobs', 'date_posted', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Jobs', 'salary');
    await queryInterface.removeColumn('Jobs', 'job_status');
    await queryInterface.removeColumn('Jobs', 'date_posted');
  }
};
