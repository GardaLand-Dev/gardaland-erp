import { Sequelize } from 'sequelize';
import UserFactory from './user/model';
import RoleFactory from './role/model';
import PrivilegeFactory from './privilege/model';
import OperationFactory from './operation/model';
import ResourceFactory from './resource/model';

export const dbConfig = (() => {
  const sequilze = new Sequelize(
    (process.env.DB_NAME = 'db'),
    (process.env.DB_USER = ''),
    (process.env.DB_PASSWORD = 'yasser9999'),
    {
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      storage: './db.sqlite',
    }
  );
  sequilze.query('PRAGMA cipher_compatibility = 3');
  sequilze.query(`PRAGMA key="${process.env.DB_PASSWORD}"`);
  return sequilze;
})();

// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
/* RBAC */
export const Operation = OperationFactory(dbConfig);
export const Resource = ResourceFactory(dbConfig);
export const Privilege = PrivilegeFactory(dbConfig);
export const Role = RoleFactory(dbConfig);
export const User = UserFactory(dbConfig);
/* RBAC - RELATIONS */
/** role-user */
User.belongsToMany(Role, { through: 'User_Role', onDelete: 'CASCADE' });
Role.belongsToMany(User, { through: 'User_Role' });
/** role-privilege */
Role.belongsToMany(Privilege, {
  through: 'Role_Privilege',
  onDelete: 'CASCADE',
});
Privilege.belongsToMany(Role, {
  through: 'Role_Privilege',
  onDelete: 'CASCADE',
});
/** privilege-resource */
Privilege.belongsToMany(Resource, {
  through: 'Privilege_Resource',
  onDelete: 'CASCADE',
});
Resource.belongsToMany(Privilege, {
  through: 'Privilege_Resource',
  onDelete: 'CASCADE',
});
/** privilege-Operation */
Privilege.belongsToMany(Operation, {
  through: 'Privilege_Operation',
  onDelete: 'CASCADE',
});
Operation.belongsToMany(Privilege, {
  through: 'Privilege_Operation',
  onDelete: 'CASCADE',
});
