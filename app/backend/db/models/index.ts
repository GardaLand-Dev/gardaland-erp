import { Sequelize } from 'sequelize';
import UserFactory from './user/model';
import RoleFactory from './role/model';
import PrivilegeFactory from './privilege/model';

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
export const Privilege = PrivilegeFactory(dbConfig);
export const Role = RoleFactory(dbConfig);
export const User = UserFactory(dbConfig);
