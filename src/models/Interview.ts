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
import { Company } from './Company';
import { Answer } from './Answer';

class Interview extends Model<
  InferAttributes<Interview>,
  InferCreationAttributes<Interview>
> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare interview_type_id: ForeignKey<number>;

  declare user_id: ForeignKey<number>;
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

Interview.hasMany(Answer, {
  foreignKey: 'interview_id',
  as: 'responses',
});
Interview.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
Interview.belongsTo(InterviewType, {
  foreignKey: 'interview_type_id',
  as: 'interviewType',
});

export { Interview };
