import express, { Request, Response } from 'express';
import { sequelize } from './database/sequelize';

import authRoutes from './routes/auth.routes';
import interviewTypeRoute from './routes/interviewType.route';
import questionRoute from './routes/question.route';
import interviewRoute from './routes/interview.route';

const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/interview-types', interviewTypeRoute);
app.use('/api/questions', questionRoute);
app.use('/api/interviews', interviewRoute);

app.get('/', async (req: Request, res: Response) => {
  // const newUser = await User.findByPk(1, {
  //   include: [User.associations.company],
  // });
  // const newUser = Admin.create({
  //   username: 'admin',
  //   email: 'admin@demo.com',
  //   password: 'password',
  // });
  // const enterprise = await newUser?.createCompany({
  //   name: 'Enterprise',
  //   email: 'enterprise',
  // });
  res.send('hello this is express');
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // sequelize.sync({ alter: true }).then(() => {
    //   console.log('Database synced');
    // });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
app.listen(port, () => {
  testConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
