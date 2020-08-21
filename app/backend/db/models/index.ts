import { Sequelize } from 'sequelize';
import UserFactory from './user/model';
import RoleFactory from './role/model';
import PrivilegeFactory from './privilege/model';
import OperationFactory from './operation/model';
import ResourceFactory from './resource/model';
import ProductFactory from './product/model';
import FamilyFactory from './family/model';
import StationFactory from './station/model';
import SupplimentFactory from './suppliment/model';
import StockableFactory from './stockable/model';
import SupplyFactory from './supply/model';
import SupplierFactory from './supplier/model';
import EmployeeFactory from './employee/model';
import TitleFactory from './title/model';
import SalaryFactory from './salary/model';
import PayrollFactory from './payroll/model';
import AttendanceFactory from './attendance/model';
import OrderFactory from './order/model';
import OrderProductFactory from './orderProducts/model';

/**
 * TODO: during setup ( only if this isn't done before ) don't forget to populate db with
 * default/basic RBAC tables i.e. Privileges, Operations, Resources and Roles
 * then itialize with a Dev User.
 * FIXME: multiple validation errors at initialisation
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
/* PRODUCTION */
/** Statics */
export const Product = ProductFactory(dbConfig);
export const Family = FamilyFactory(dbConfig);
export const Station = StationFactory(dbConfig);
export const Suppliment = SupplimentFactory(dbConfig);
/** Inventory */
export const Stockable = StockableFactory(dbConfig);
export const Supply = SupplyFactory(dbConfig);
export const Supplier = SupplierFactory(dbConfig);
/** Humain Resources */
export const Employee = EmployeeFactory(dbConfig);
export const Title = TitleFactory(dbConfig);
export const Salary = SalaryFactory(dbConfig);
export const Payroll = PayrollFactory(dbConfig);
export const Attendance = AttendanceFactory(dbConfig);
/** Orders */
export const Order = OrderFactory(dbConfig);
export const OrderProduct = OrderProductFactory(dbConfig);

export const dbInit = async () => {
  /* RBAC - RELATIONS */
  /** role-user */
  User.belongsToMany(Role, { through: 'user_roles' });
  Role.belongsToMany(User, { through: 'user_roles', onDelete: 'RESTRICT' });
  /** role-privilege */
  Role.belongsToMany(Privilege, {
    through: 'role_privileges',
    onDelete: 'CASCADE',
  });
  Privilege.belongsToMany(Role, {
    through: 'role_privilege',
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

  /* PRODUCTION - RELATIONS */
  /*  STATICS */
  /**  product-family */
  Product.belongsTo(Family);
  Family.hasMany(Product);
  /**  family-station */
  Family.belongsTo(Station);
  Station.hasMany(Family);
  /** INVENTORY */
  /**  supplier-supply */
  Supply.belongsTo(Supplier);
  Supplier.hasMany(Supply);
  /**  stockable-supply */
  Supply.belongsTo(Stockable);
  Stockable.hasMany(Supply);
  /** HR */
  /**  employee-attendance  */
  Attendance.belongsTo(Employee);
  Employee.hasMany(Attendance);
  /**  employee-payroll  */
  Payroll.belongsTo(Employee);
  Employee.hasMany(Payroll);
  /**  employee-salary  */
  Salary.belongsTo(Employee);
  Employee.hasMany(Salary);
  /**  employee-title  */
  Title.belongsTo(Employee);
  Employee.hasMany(Title);
  /** ORDERS */
  /**  order-orderProduct */
  OrderProduct.belongsTo(Order);
  Order.hasMany(OrderProduct);

  /** STATIC-INVENTORY RELATIONS */
  /**  product-stockable */
  Product.belongsToMany(Stockable, { through: 'product_stockables' });
  Stockable.belongsToMany(Product, { through: 'product_stockables' });
  /**  stockable-suppliment */
  Suppliment.belongsTo(Stockable);
  Stockable.hasMany(Suppliment);
  /** STATIC-ORDER RELATIONS */
  /**  product-orderProduct */
  OrderProduct.belongsTo(Product);
  Product.hasMany(OrderProduct);
  /**  OrderProduct-suppliment */
  Suppliment.belongsToMany(OrderProduct, {
    through: 'orderProduct_suppliments',
  });
  OrderProduct.belongsToMany(Suppliment, {
    through: 'orderProduct_suppliments',
  });
  /** PRODUCTION-RBAC RELATIONS */
  /**  user-supply */
  Supply.belongsTo(User);
  User.hasMany(Supply, { foreignKey: 'createdBy', foreignKeyConstraint: true });
  /**  user-employee */
  Employee.hasOne(User);
  /**  user-payroll */
  Payroll.belongsTo(User);
  User.hasMany(Payroll, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });
  /**  user-order */
  Order.belongsTo(User, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });
  User.hasMany(Order);

  /* SYNCING */
  await dbConfig
    .sync()
    .then(() => console.log('database created and syncronized'))
    .catch((err) => console.log('couldnt synchronize db', err));
};
