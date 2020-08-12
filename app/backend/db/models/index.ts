import { Sequelize } from 'sequelize';
import UserFactory from './user/model';
import RoleFactory from './role/model';
import PrivilegeFactory from './privilege/model';
import OperationFactory from './operation/model';
import ResourceFactory from './resource/model';

/**
 * TODO: during setup ( only if this isn't done before ) don't forget to populate db with
 * default/basic RBAC tables i.e. Privileges, Operations, Resources and Roles
 * then itialize with a Dev User
 * */

const dbConfig = (() => {
  const sequilze = new Sequelize(
    (process.env.DB_NAME = 'db'),
    (process.env.DB_USER = ''),
    (process.env.DB_PASSWORD = 'yasser9999'),
    {
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      storage: './db.sqlite',
      logging: () => {},
    }
  );
  sequilze.query(`PRAGMA key="${process.env.DB_PASSWORD}"`);
  return sequilze;
})();

// export const dbConfig1 = (() => {
//   const sequilze = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db1.sqlite',
//   });
//   return sequilze;
// })();

export default dbConfig;

// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
/* RBAC */
export const Operation = OperationFactory(dbConfig);
export const Resource = ResourceFactory(dbConfig);
export const Privilege = PrivilegeFactory(dbConfig);
export const Role = RoleFactory(dbConfig);
export const User = UserFactory(dbConfig);
export const dbInit = () => {
  /* RBAC - RELATIONS */
  /** role-user */
  User.belongsToMany(Role, { through: 'User_Role' });
  Role.belongsToMany(User, { through: 'User_Role', onDelete: 'RESTRICT' });
  /** role-privilege */
  Role.belongsToMany(Privilege, {
    through: 'Role_Privilege',
    onDelete: 'CASCADE',
  });
  Privilege.belongsToMany(Role, {
    through: 'Role_Privilege',
    onDelete: 'RESTRICT',
  });
  /** privilege-resource */
  Privilege.belongsTo(Resource);
  Resource.hasMany(Privilege, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'RESTRICT',
  });
  /** privilege-Operation */
  Privilege.belongsTo(Operation);
  Operation.hasMany(Privilege, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'RESTRICT',
  });

  /* SYNCING */
  dbConfig
    .sync()
    .then(() => console.log('database created and syncronized'))
    .catch((err) => console.log('couldnt synchronize db', err));
};
