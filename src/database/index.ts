// import { Company } from '../models/Company'; // Adjust paths as needed
// import { User } from '../models/User'; // Adjust paths as needed
// import { InterviewType } from '../models/InterviewType'; // Adjust paths as needed
// import { Question } from '../models/Question'; // Adjust paths as needed
// import { Interview } from '../models/Interview'; // Adjust paths as needed
// import { Answer } from '../models/Answer';
// import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
//
// const sequelizeConfig: SequelizeOptions = {
//   database: 'karzo',
//   dialect: 'mysql',
//   host: '127.0.0.1',
//   username: 'root',
//   password: undefined,
//   port: 3306,
//   logging: console.log,
//   models: [__dirname + '/models'],
// };
// const sequelize = new Sequelize(sequelizeConfig);
//
// // Add models to Sequelize
// sequelize.addModels([
//   Company,
//   User,
//   InterviewType,
//   Question,
//   Interview,
//   Answer,
// ]);
//
// // Set up associations
// const models = sequelize.models;
//
// // Call the `associate` method for each model to set up relationships
// Object.values(models).forEach((model: any) => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });
//
// // Test the database connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
//
// testConnection();
//
// // Export the Sequelize instance and models
// export { sequelize, Company, User, InterviewType, Question, Interview, Answer };
