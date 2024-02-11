'use strict';

const candidate = require('../models/candidate');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // make candidate_id as primary key
    await queryInterface.addConstraint('Candidates', {
      fields: ['candidate_id'],
      type: 'primary key',
      name: 'candidate_id_pk'
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
