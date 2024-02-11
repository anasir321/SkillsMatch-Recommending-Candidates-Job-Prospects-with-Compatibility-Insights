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
    await queryInterface.addColumn('Institutes', 'institute_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Institutes', 'degree_program', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Institutes', 'duration', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.removeColumn('Institutes', 'id');
    await queryInterface.addConstraint('Institutes', {
      fields: ['institute_id'],
      type: 'primary key',
      name: 'institute_id_pk'
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
