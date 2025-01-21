'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('InterviewTypes', 'company_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust based on your requirements
      references: {
        model: 'Companies', // Name of the target table
        key: 'id', // Key in the target table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    // Step 1: Remove the `admin_id` column
    await queryInterface.removeColumn('InterviewTypes', 'company_id');
  },
};
