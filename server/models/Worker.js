"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Shop, { foreignKey: "shop_id" });
    }
  }
  Worker.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      salary: DataTypes.NUMERIC,
      hire_date: DataTypes.DATEONLY,
      performance: DataTypes.INTEGER,
      shop_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Worker",
      underscored: true,
      timestamps: false
    }
  );
  return Worker;
};