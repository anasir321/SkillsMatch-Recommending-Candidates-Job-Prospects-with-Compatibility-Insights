'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyHR_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company_HR',
        key: 'companyHR_id',
      },
    },
    company_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_logo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    company_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_founded_date: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Company',
    timestamps: false,
  });
  return Company;
};