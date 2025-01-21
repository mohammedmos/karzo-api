'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Remove the existing `user_id` foreign key
    await queryInterface.removeConstraint('Companies', 'companies_ibfk_1'); // Replace with the actual constraint name

    // Step 2: Remove the `user_id` column
    await queryInterface.removeColumn('Companies', 'user_id');

    // Step 3: Add the new `admin_id` column
    await queryInterface.addColumn('Companies', 'admin_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust based on your requirements
      references: {
        model: 'Admins', // Name of the target table
        key: 'id', // Key in the target table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Remove the `admin_id` column
    await queryInterface.removeColumn('Companies', 'admin_id');

    // Step 2: Add back the `user_id` column
    await queryInterface.addColumn('Companies', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust based on your requirements
      references: {
        model: 'Users', // Name of the target table
        key: 'id', // Key in the target table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};
