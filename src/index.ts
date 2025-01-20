import express, { Request, Response } from 'express';
import { sequelize } from './database/sequelize';
import { User } from './models/User';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const newUser = await User.findByPk(1);
  // const enterprise = await newUser?.createCompany({
  //   name: 'Enterprise',
  //   email: 'enterprise',
  // });
  res.send(newUser?.getCompany());
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
app.listen(port, () => {
  testConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
