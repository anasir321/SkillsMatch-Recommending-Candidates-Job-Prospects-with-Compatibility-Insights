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
    await queryInterface.addColumn('Companies', 'company_description',{
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Companies', 'company_size',{
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Companies', 'company_location',{
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
