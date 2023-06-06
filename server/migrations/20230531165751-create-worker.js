"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("workers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      revenue: {
        type: Sequelize.NUMERIC,
        allowNull: false,
      },
      month_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worst_day_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      performance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shop_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "shops",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("workers");
  },
};
