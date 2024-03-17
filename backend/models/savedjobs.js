'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedJobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // SavedJobs.belongsTo(models.Candidate, {
      //   foreignKey: 'candidate_id',
      //   onDelete: 'CASCADE',
      // });
      // SavedJobs.belongsTo(models.Company_HR, {
      //   foreignKey: 'companyHR_id',
      //   onDelete: 'CASCADE',
      // });
      // SavedJobs.belongsTo(models.Job, {
      //   foreignKey: 'job_id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  SavedJobs.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    modelName: 'SavedJobs',
    timestamps: true,
  });
  return SavedJobs;
};