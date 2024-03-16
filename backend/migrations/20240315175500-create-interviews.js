'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Interviews', {
      interview_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      alternate_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      alternate_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'job_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Candidates',
          key: 'candidate_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      companyHR_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Company_HRs',
          key: 'companyHR_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'rescheduled', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'scheduled'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Interviews');
  }
};