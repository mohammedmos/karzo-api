import {
  Association,
  DataTypes,
  HasManyRemoveAssociationMixin,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyCreateAssociationMixin,
  // HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
// import { InterviewType } from './InterviewType';
// import { Question } from './Question';
// import { Interview } from './Interview';
import { Company } from './Company';
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
  declare removeCompany: HasManyRemoveAssociationMixin<Company, number>;
  declare createCompany: HasManyCreateAssociationMixin<Company, 'user_id'>;
  declare getCompany: HasOneGetAssociationMixin<Company>;
  declare company?: NonAttribute<Company[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    company: Association<User, Company>;
  };
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
User.hasOne(Company, {
  foreignKey: 'user_id',
  as: 'company',
});

export { User };
