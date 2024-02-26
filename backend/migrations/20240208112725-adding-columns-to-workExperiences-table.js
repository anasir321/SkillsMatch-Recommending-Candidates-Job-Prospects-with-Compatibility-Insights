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
    await queryInterface.addColumn('WorkExperiences', 'company_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('WorkExperiences', 'position', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('WorkExperiences', 'duration', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.removeColumn('WorkExperiences', 'id');
    await queryInterface.addConstraint('WorkExperiences', {
      fields: ['work_experience_id'],
      type: 'primary key',
      name: 'work_experience_id_pk'
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
