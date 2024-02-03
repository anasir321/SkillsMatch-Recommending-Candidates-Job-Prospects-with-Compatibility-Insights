'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      job_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      job_title: {
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
      job_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      soft_skills_required: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      work_experience_required: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      education_required: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skills_required: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};