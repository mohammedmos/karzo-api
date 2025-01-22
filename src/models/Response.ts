import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { User } from './User';
import { InterviewType } from './InterviewType';
import { Question } from './Question';
import { Interview } from './Interview';
import { Company } from './Company';

class Response extends Model<InferAttributes<Response>, InferCreationAttributes<Response>> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare question: Text;
  declare answer: string;
  declare interview_id: ForeignKey<number>;

  static associate(models: {
    Company: typeof Company;
    User: typeof User;
    InterviewType: typeof InterviewType;
    Question: typeof Question;
    Interview: typeof Interview;
    Answer: typeof Response;
  }) {
    Response.belongsTo(models.Interview, {
      foreignKey: 'interview_id',
      as: 'interview',
    });
  }
}

Response.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Response',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

export { Response };
