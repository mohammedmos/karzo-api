'use strict';
/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Interviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      interview_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'InterviewTypes',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Interviews');
  },
};
