'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CandidateInterviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CandidateInterviews.belongsTo(models.Candidates, {
        foreignKey: 'candidate_id',
        onDelete: 'CASCADE',
      });
      CandidateInterviews.belongsTo(models.Interviews, {
        foreignKey: 'interview_id',
        onDelete: 'CASCADE',
      });
    }
  }
  CandidateInterviews.init({
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
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Interviews',
        key: 'interview_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'CandidateInterviews',
    timestamps: true,
  });
  return CandidateInterviews;
};