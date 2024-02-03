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
    await queryInterface.removeColumn('Candidates', 'user_id');
    await queryInterface.changeColumn('Candidates', 'dateOfBirth', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('Candidates', 'education', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Candidates', 'skills', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Candidates', 'work_experience', {
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
  }
};
