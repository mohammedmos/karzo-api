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
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Response } from './Response';
import { Report } from './Report';
import { InterviewType } from './InterviewType';
import { User } from './User';
// import { Company } from './Company';
// import { User } from './User';
// import { InterviewType } from './InterviewType';
// import { Question } from './Question';
// import { Company } from './Company';
// import { Response } from './Response';

class Interview extends Model<InferAttributes<Interview>, InferCreationAttributes<Interview>> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare interview_type_id: ForeignKey<number>;

  declare user_id: ForeignKey<number>;

  declare responses?: NonAttribute<Array<Response>>;
  declare report?: NonAttribute<Report>;

  declare removeReport: HasManyRemoveAssociationMixin<Report, number>;
  declare removeResponses: HasManyRemoveAssociationMixin<Response, number>;
  declare createReport: HasOneCreateAssociationMixin<Report>;
  declare createResponses: HasManyCreateAssociationMixin<Response>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(models) {
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
    Interview.belongsTo(InterviewType, {
      foreignKey: 'interview_type_id',
      as: 'interviewType',
    });
  }
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
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Interview',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

export { Interview };
