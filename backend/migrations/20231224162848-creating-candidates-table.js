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
    await queryInterface.createTable('Candidates', {
      candidate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      education: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      skills: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      softSkills: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resume: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      linkedinURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      githubURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferredJobType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferredJobTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      },
      {
        timestamps: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable('Candidates');
  }
};
