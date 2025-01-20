import { Sequelize } from 'sequelize-typescript';
// import { User } from './models/User'; // Import your models here

const sequelize = new Sequelize({
  database: 'karzo',
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: undefined,
  port: 3306,
  logging: console.log,
  models: [__dirname + '/models'],
  dialectOptions: {},
});

export { sequelize };
