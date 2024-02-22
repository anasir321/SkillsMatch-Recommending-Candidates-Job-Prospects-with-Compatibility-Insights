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
    await queryInterface.addColumn('Companies', 'company_size', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Companies', 'company_facebook', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Companies', 'company_instagram', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Companies', 'company_twitter', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Companies', 'company_phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Companies', 'company_founded_date', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Modify column type of company_description to TEXT
    await queryInterface.changeColumn('Companies', 'company_description', {
      type: Sequelize.TEXT,
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
    await queryInterface.removeColumn('Companies', 'company_size');
    await queryInterface.removeColumn('Companies', 'company_facebook');
    await queryInterface.removeColumn('Companies', 'company_instagram');
    await queryInterface.removeColumn('Companies', 'company_twitter');
    await queryInterface.removeColumn('Companies', 'company_phone');
    await queryInterface.removeColumn('Companies', 'company_founded_date');
    // Revert column type change of company_description to STRING
    await queryInterface.changeColumn('Companies', 'company_description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
