'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sentence: {
        type: Sequelize.STRING
      },
      sentence_ar: {
        type: Sequelize.STRING
      },
      sentence_fr: {
        type: Sequelize.STRING
      },
      interview_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'InterviewTypes',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};