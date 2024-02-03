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
    await queryInterface.addColumn('Candidates', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    });
    await queryInterface.addColumn('Candidates', 'firstname', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'lastname', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'dateOfBirth', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'education', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'skills', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'work_experience', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Candidates', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Candidates', 'location', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Candidates', 'social_profile_link', {
      type: Sequelize.STRING,
      allowNull: true
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
