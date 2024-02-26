'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Candidates', 'education_level', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Candidates', 'experience', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Candidates', 'work_preference', {
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
