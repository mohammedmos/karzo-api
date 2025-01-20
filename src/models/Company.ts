import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  DataTypes,
  CreationOptional,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../database/sequelize';

import { Column, Table } from 'sequelize-typescript';
import { User } from './User';
@Table
class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare email: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare photo: string | null;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare user_id: ForeignKey<number>;

  declare owner?: NonAttribute<User>;
}
Company.init(
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
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the table, not the model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Company', // Ensure the model name is set
  }
);

// Company.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

export { Company };
