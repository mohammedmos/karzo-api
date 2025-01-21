import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  // HasManyGetAssociationsMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
// import { InterviewType } from './InterviewType';
// import { Question } from './Question';
// import { Interview } from './Interview';
// import { Company } from './Company';
// import { HasOne } from 'sequelize-typescript';
// import { Association } from 'sequelize-typescript';
// import { Answer } from './Answer';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare cv: string | null;

  declare phone: string | null;

  declare createdAt: CreationOptional<Date> | null;

  declare updatedAt: CreationOptional<Date> | null;
}
// User.hasOne(Company, {
//   foreignKey: 'user_id',
//   as: 'company',
// });
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
