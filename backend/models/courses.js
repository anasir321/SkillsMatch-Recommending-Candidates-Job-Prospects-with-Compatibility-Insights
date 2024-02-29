'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Courses.init({
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      URL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_intro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      course_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subtitle_language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instructors: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_views: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true,
      }
  }, {
    sequelize,
    modelName: 'Courses',
    timestamps: false,
  });
  return Courses;
};