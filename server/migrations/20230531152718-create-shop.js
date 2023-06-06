'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_revenue: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      open_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      area: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shops');
  }
};