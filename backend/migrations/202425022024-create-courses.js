'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      course_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      URL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_intro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sub_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subtitle_language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      skills: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instructors: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_views: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      site: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};