import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, NonAttribute, Association } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Interview } from './Interview';
import { Question } from './Question';
// import { User } from './User';
// import { Admin } from './Admin';
import { Company } from './Company';
import { Column, Table } from 'sequelize-typescript';
@Table
class InterviewType extends Model<InferAttributes<InterviewType>, InferCreationAttributes<InterviewType>> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug_ar: string | null;
  declare slug_fr: string | null;
  declare slug: string | null;
  declare company_id: number | null;

  declare company?: NonAttribute<Company>;

  declare static associations: {
    company: Association<InterviewType, Company>;
    questions: Association<InterviewType, Company>;
  };
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
    company_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Companies', // Name of the table, not the model
        key: 'id',
      },
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
