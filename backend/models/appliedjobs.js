'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppliedJobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppliedJobs.belongsTo(models.Jobs, {
        foreignKey: 'job_id',
        onDelete: 'CASCADE',
      });
      AppliedJobs.belongsTo(models.Candidates, {
        foreignKey: 'candidate_id',
        onDelete: 'CASCADE',
      });
    }
  }
  AppliedJobs.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    job_id:{ 
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AppliedJobs',
    timestamps: true,
  });
  return AppliedJobs;
};