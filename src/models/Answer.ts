import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import { User } from './User';
import { InterviewType } from './InterviewType';
import { Question } from './Question';
import { Interview } from './Interview';
import { Company } from './Company';

class Answer extends Model<
  InferAttributes<Answer>,
  InferCreationAttributes<Answer>
> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare question: string;
  declare answer: string;
  declare interview_id: ForeignKey<number>;

  static associate(models: {
    Company: typeof Company;
    User: typeof User;
    InterviewType: typeof InterviewType;
    Question: typeof Question;
    Interview: typeof Interview;
    Answer: typeof Answer;
  }) {
    Answer.belongsTo(models.Interview, {
      foreignKey: 'interview_id',
      as: 'interview',
    });
  }
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Answer',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

export { Answer };
