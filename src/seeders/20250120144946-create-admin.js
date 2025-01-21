import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

// eslint-disable-next-line no-undef
module.exports = {
  // eslint-disable-next-line prettier/prettier
  up: async (queryInterface: QueryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password', salt);

    return queryInterface.bulkInsert('Admins', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Admins', {});
  },
};
