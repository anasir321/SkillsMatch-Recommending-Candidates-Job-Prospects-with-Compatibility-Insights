'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyHR_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Company_HRs',
          key: 'companyHR_id',
        },
      },
      company_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_website: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_logo: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};