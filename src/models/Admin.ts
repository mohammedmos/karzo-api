import {
  Association,
  DataTypes,
  HasManyRemoveAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../database/sequelize'; // Adjust the path as needed
import bcrypt from 'bcrypt';
import { Company } from './Company';

class Admin extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
  declare company?: NonAttribute<Company>;

  declare removeCompany: HasManyRemoveAssociationMixin<Company, number>;
  declare createCompany: HasOneCreateAssociationMixin<Company>;
  declare getCompany: HasOneGetAssociationMixin<Company>;
  // declare company?: NonAttribute<Company[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    company: Association<Admin, Company>;
  };
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    hooks: {
      beforeCreate: async (admin: Admin) => {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      },
      beforeUpdate: async (admin: Admin) => {
        if (admin.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
    },
  }
);
Admin.hasOne(Company, {
  foreignKey: 'admin_id',
  as: 'company',
});

export { Admin };
