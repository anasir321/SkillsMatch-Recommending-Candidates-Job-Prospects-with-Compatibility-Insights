'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Candidate.hasMany(models.WorkExperience, {
        foreignKey: 'candidate_id',
        onDelete: 'CASCADE',
      });
      Candidate.hasMany(models.Institute, {
        foreignKey: 'candidate_id',
        onDelete: 'CASCADE',
      });
      // Candidate.hasMany(models.AppliedJob, {
      //   foreignKey: 'candidate_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  Candidate.init({
    candidate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    linkedinURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredJobType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    softSkills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredJobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    education_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_preference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Candidate',
    timestamps: false,
    primaryKey: 'candidate_id'
  });
  return Candidate;
};