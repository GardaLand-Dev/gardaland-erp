import { Sequelize } from 'sequelize';
import path from 'path';
import UserFactory from './rbac/user/model';
import RoleFactory from './rbac/role/model';
import PrivilegeFactory from './rbac/privilege/model';
import OperationFactory from './rbac/operation/model';
import ResourceFactory from './rbac/resource/model';
import ProductFactory from './products/product/model';
import FamilyFactory from './products/family/model';
import StationFactory from './products/station/model';
import SupplimentFactory from './products/suppliment/model';
import ProductStockableFactory from './products/productStockables/model';
import StockableFactory from './inventory/stockable/model';
import SupplyFactory from './inventory/supply/model';
import SupplierFactory from './inventory/supplier/model';
import EmployeeFactory from './humanResources/employee/model';
import TitleFactory from './humanResources/title/model';
import SalaryFactory from './humanResources/salary/model';
import PayrollFactory from './humanResources/payroll/model';
import AttendanceFactory from './humanResources/attendance/model';
import OrderFactory from './sales/order/model';
import OrderProductFactory from './sales/orderProducts/model';
import OrderProductSupplimentFactory from './sales/orderProductSuppliments/model';

/**
 * TODO: during setup ( only if this isn't done before ) don't forget to populate db with
 * default/basic RBAC tables i.e. Privileges, Operations, Resources and Roles
 * then itialize with a Dev User.
 * FIXME: multiple validation errors at initialisation
 * */
export const DEFAULT_LIMIT = 10;

const dbConfig = (() => {
  const sequilze = new Sequelize(
    (process.env.DB_NAME = 'db'),
    (process.env.DB_USER = ''),
    (process.env.DB_PASSWORD = 'yasser9999'),
    {
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      storage: path.join(__dirname, 'db.sqlite'),
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
export const ProductStockable = ProductStockableFactory(dbConfig);
/** Humain Resources */
export const Employee = EmployeeFactory(dbConfig);
export const Title = TitleFactory(dbConfig);
export const Salary = SalaryFactory(dbConfig);
export const Payroll = PayrollFactory(dbConfig);
export const Attendance = AttendanceFactory(dbConfig);
/** Orders */
export const Order = OrderFactory(dbConfig);
export const OrderProduct = OrderProductFactory(dbConfig);
export const OrderProductSuppliment = OrderProductSupplimentFactory(dbConfig);

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
  /** resource-operation */
  // Resource.belongsToMany(Operation, { through: Privilege });
  // Operation.belongsToMany(Resource, { through: Privilege });

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
  /**  stockable-supplier */
  Stockable.belongsToMany(Supplier, {
    through: { model: Supply, unique: false },
  });
  Supplier.belongsToMany(Stockable, {
    through: { model: Supply, unique: false },
  });
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
  Product.belongsToMany(Stockable, { through: ProductStockable });
  Stockable.belongsToMany(Product, { through: ProductStockable });
  /**  Product-ProductStockable */
  Product.hasMany(ProductStockable, { as: 'productStockables' });
  ProductStockable.belongsTo(Product);
  /**  stockable-suppliment */
  Suppliment.belongsTo(Stockable);
  Stockable.hasMany(Suppliment);
  /** STATIC-ORDER RELATIONS */
  /**  product-orderProduct */
  OrderProduct.belongsTo(Product);
  Product.hasMany(OrderProduct);
  /**  OrderProduct-suppliment */
  Suppliment.belongsToMany(OrderProduct, {
    through: OrderProductSuppliment,
  });
  OrderProduct.belongsToMany(Suppliment, {
    through: OrderProductSuppliment,
  });
  /**  OrderProduct-OrderProductSuppliment */
  OrderProduct.hasMany(OrderProductSuppliment, {
    as: 'orderProductSuppliments',
  });
  OrderProductSuppliment.belongsTo(OrderProduct);
  /** orderProductSuppliment-Suppliment */
  Suppliment.hasMany(OrderProductSuppliment);
  OrderProductSuppliment.belongsTo(Suppliment);
  /** PRODUCTION-RBAC RELATIONS */
  /**  user-supply */
  Supply.belongsTo(User);
  User.hasMany(Supply, { foreignKey: 'createdBy', foreignKeyConstraint: true });
  /**  user-employee */
  // Employee.hasOne(User, { foreignKey: { allowNull: true } });
  User.belongsTo(Employee);
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
