"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Worker, { foreignKey: "shop_id", onDelete: 'CASCADE', hooks: true });
    }
  }
  Shop.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      total_revenue: DataTypes.NUMERIC,
      open_date: DataTypes.DATEONLY,
      area: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop",
      underscored: true,
      timestamps: false,
    }
  );
  return Shop;
};
