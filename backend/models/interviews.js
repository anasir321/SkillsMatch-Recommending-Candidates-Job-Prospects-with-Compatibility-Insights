'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Interviews.belongsTo(models.Job, {
      //   foreignKey: 'job_id',
      //   onDelete: 'CASCADE',
      // });
      // Interviews.belongsTo(models.Candidate, {
      //   foreignKey: 'candidate_id',
      //   onDelete: 'CASCADE',
      // });
      // Interviews.belongsTo(models.Company_HR, {
      //   foreignKey: 'companyHR_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  Interviews.init({
    interview_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Jobs',
        key: 'job_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Candidates',
        key: 'candidate_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    companyHR_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company_HRs',
        key: 'companyHR_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    alternate_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    alternate_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'accepted with original date & time', 'accepted with alternate date & time', 'ignored by candidate','cancelled by HR'),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Interviews',
  });
  return Interviews;
};