import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { InterviewType } from './InterviewType';
import { Interview } from './Interview';

class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  declare id: CreationOptional<number>;

  declare sentence: string;

  declare sentence_ar: string | null;

  declare sentence_fr: string | null;

  declare interview_type_id: ForeignKey<number>;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sentence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentence_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sentence_fr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interview_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);
// Question.belongsTo(InterviewType, {
//   foreignKey: 'interview_type_id',
//   as: 'interviewType',
// });
// Question.hasMany(Interview, {
//   foreignKey: 'question_id',
//   as: 'interviews',
// });
export { Question };
