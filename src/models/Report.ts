import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database/sequelize';

import { User } from './User';
import { Interview } from './Interview';

class Report extends Model<InferAttributes<Report>, InferCreationAttributes<Report>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare overall_evaluation: number;
  declare report_data: string;
  declare user_id: number | null;
  declare interview_id: number | null;

  declare user?: NonAttribute<User>;
  declare interview?: NonAttribute<Interview>;

  declare static associations: {
    user: Association<Report, User>;
    interview: Association<Report, Interview>;
  };
  declare createdAt: CreationOptional<Date> | null;

  declare updatedAt: CreationOptional<Date> | null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(models) {}
}
Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overall_evaluation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    report_data: {
      type: DataTypes.JSON,
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
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Interviews', // Name of the table, not the model
        key: 'id',
      },
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
    modelName: 'Report',
  }
);
export { Report };
