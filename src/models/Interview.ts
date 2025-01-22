import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
  NonAttribute,
  HasManyRemoveAssociationMixin,
  HasOneCreateAssociationMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Response } from './Response';
import { Report } from './Report';
import { User } from './User';

class Interview extends Model<InferAttributes<Interview>, InferCreationAttributes<Interview>> {
  declare id: CreationOptional<number>;
  declare interview_type_id: ForeignKey<number>;

  declare user_id: ForeignKey<number>;

  declare responses?: NonAttribute<Array<Response>>;
  declare report?: NonAttribute<Report>;
  declare user?: NonAttribute<User>;

  declare removeReport: HasManyRemoveAssociationMixin<Report, number>;
  declare removeResponses: HasManyRemoveAssociationMixin<Response, number>;
  declare createReport: HasOneCreateAssociationMixin<Report>;
  declare createResponses: HasManyCreateAssociationMixin<Response>;
  declare static associations: {
    report: Association<Interview, Report>;
    response: Association<Interview, Response>;
    user: Association<Interview, User>;
  };
}

Interview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    interview_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'InterviewTypes', // Name of the table, not the model
        key: 'id',
      },
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
    modelName: 'Interview',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);
Interview.hasMany(Response, {
  foreignKey: 'interview_id',
  as: 'responses',
});
Interview.hasOne(Report, {
  foreignKey: 'interview_id',
  as: 'report',
});
Interview.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

export { Interview };
