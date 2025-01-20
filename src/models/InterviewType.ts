import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Interview } from './Interview';
import { Question } from './Question';

class InterviewType extends Model<
  InferAttributes<InterviewType>,
  InferCreationAttributes<InterviewType>
> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare name: string;
  declare slug_ar: string | null;
  declare slug_fr: string | null;
  declare slug: string | null;

  // InterviewType.belongsTo(models.Company, {
  //   foreignKey: 'company_id',
  //   as: 'company',
  // });
}

InterviewType.init(
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
    slug_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug_fr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'InterviewType',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);
InterviewType.hasMany(Question, {
  foreignKey: 'interview_type_id',
  as: 'questions',
});
InterviewType.hasMany(Interview, {
  foreignKey: 'interview_type_id',
  as: 'interviews',
});
export { InterviewType };
