import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  DataTypes,
  CreationOptional,
  NonAttribute,
  Association,
} from 'sequelize';
import { sequelize } from '../database/sequelize';

import { Column, Table } from 'sequelize-typescript';
import { User } from './User';
import { Admin } from './Admin';
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
  declare admin_id: ForeignKey<number>;

  declare owner?: NonAttribute<User>;

  declare static associations: {
    admin: Association<Company, Admin>;
  };
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
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Admins', // Name of the table, not the model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Company', // Ensure the model name is set
  }
);
// Company.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });

// Company.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

export { Company };
