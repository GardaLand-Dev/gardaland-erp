import { Sequelize } from 'sequelize';
import path from 'path';
import log from 'electron-log';
import UserFactory from './rbac/user/model';
import RoleFactory from './rbac/role/model';
import PrivilegeFactory from './rbac/privilege/model';
import OperationFactory from './rbac/operation/model';
import ResourceFactory from './rbac/resource/model';
import RestaurantCredsFactory from './rbac/restaurantCreds/model';
import ProductFactory from './products/product/model';
import FamilyFactory from './products/family/model';
import StationFactory from './products/station/model';
import SupplimentFactory from './products/suppliment/model';
import ProductInvItemFactory from './products/productIngredients/model';
import InvItemFactory from './inventory/invItem/model';
import SupplyFactory from './inventory/supply/model';
import SupplierFactory from './inventory/supplier/model';
import DamagesFactory from './inventory/damages/model';
import EmployeeFactory from './humanResources/employee/model';
import TitleFactory from './humanResources/title/model';
import SalaryFactory from './humanResources/salary/model';
import PayrollFactory from './humanResources/payroll/model';
import AttendanceFactory from './humanResources/attendance/model';
import OrderFactory from './sales/order/model';
import OrderProductFactory from './sales/orderProducts/model';
import OrderProductSupplimentFactory from './sales/orderProductSuppliments/model';
import ClientFactory from './clients/client/model';
import ClientOrderFactory from './clients/clientOrder/model';
import FinancialTransactionFactory from './finance/financialTransaction/model';
import TransactionTypeFactory from './finance/transactionType/model';
import FinancialAccountFactory from './finance/financialAccount/model';
import ExpenseFactory from './finance/expense/model';
import InvoiceFactory from './finance/invoice/model';

/**
 * TODO: during setup ( only if this isn't done before ) don't forget to populate db with
 * default/basic RBAC tables i.e. Privileges, Operations, Resources and Roles
 * then itialize with a Dev User.
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
export const RestaurantCreds = RestaurantCredsFactory(dbConfig);
/* PRODUCTION */
/** products */
export const Product = ProductFactory(dbConfig);
export const Family = FamilyFactory(dbConfig);
export const Station = StationFactory(dbConfig);
export const Suppliment = SupplimentFactory(dbConfig);
/** Inventory */
export const InvItem = InvItemFactory(dbConfig);
export const Supply = SupplyFactory(dbConfig);
export const Supplier = SupplierFactory(dbConfig);
export const ProductInvItem = ProductInvItemFactory(dbConfig);
export const Damages = DamagesFactory(dbConfig);
/** Humain Resources */
export const Employee = EmployeeFactory(dbConfig);
export const Title = TitleFactory(dbConfig);
export const Salary = SalaryFactory(dbConfig);
export const Payroll = PayrollFactory(dbConfig);
export const Attendance = AttendanceFactory(dbConfig);
/** sales */
export const Order = OrderFactory(dbConfig);
export const OrderProduct = OrderProductFactory(dbConfig);
export const OrderProductSuppliment = OrderProductSupplimentFactory(dbConfig);
/** Client */
export const Client = ClientFactory(dbConfig);
export const ClientOrder = ClientOrderFactory(dbConfig);
/** Finance */
export const FinancialTransaction = FinancialTransactionFactory(dbConfig);
export const FinancialAccount = FinancialAccountFactory(dbConfig);
export const TransactionType = TransactionTypeFactory(dbConfig);
export const Expense = ExpenseFactory(dbConfig);
export const Invoice = InvoiceFactory(dbConfig);

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
  /*  PRODUCTS */
  /**  product-family */
  Product.belongsTo(Family);
  Family.hasMany(Product);
  /**  family-station */
  Family.belongsTo(Station);
  Station.hasMany(Family);

  /** INVENTORY */
  /**  invItem-supply */
  Supply.belongsTo(InvItem);
  InvItem.hasMany(Supply);
  /**  invItem-damages */
  Damages.belongsTo(InvItem);
  InvItem.hasMany(Damages);

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

  /** FINANCE */
  /**  financialTransaction-transactionType */
  FinancialTransaction.belongsTo(TransactionType);
  TransactionType.hasMany(FinancialTransaction);
  /** expense-financialTransaction */
  Expense.belongsTo(FinancialTransaction);

  // ############################################################
  // ############################################################
  /** CLIENT-SALES RELATIONS */
  /** orders-clientOrder */
  ClientOrder.belongsTo(Order);
  /** clientOrder-client */
  ClientOrder.belongsTo(Client);
  Client.hasMany(ClientOrder);

  /** FINANCE-HR RELATIONS */
  /** payroll-financialTransaction */
  Payroll.belongsTo(FinancialTransaction);

  /** FINANCE-INVENTORY RELATIONS */
  /** invoice-supply */
  Supply.belongsTo(Invoice);
  /** invoice-supplier */
  Invoice.belongsTo(Supplier);
  Supplier.hasMany(Invoice);

  /** FINANCE-RBAC RELATIONS */
  /**  user-invoice */
  Invoice.belongsTo(User);
  User.hasMany(Invoice, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });
  /**  user-expenses */
  Expense.belongsTo(User);
  User.hasMany(Expense, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });

  /** FINANCE-SALES RELATIONS */
  /** financialTransaction-order */
  Order.belongsTo(FinancialTransaction);

  /** HR-RBAC RELATIONS */
  /**  user-employee */
  // Employee.hasOne(User, { foreignKey: { allowNull: true } });
  User.belongsTo(Employee);
  /**  user-payroll */
  Payroll.belongsTo(User);
  User.hasMany(Payroll, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });

  /** INVENTORY-PRODUCTS RELATIONS */
  /**  product-invItem */
  Product.belongsToMany(InvItem, { through: ProductInvItem });
  InvItem.belongsToMany(Product, { through: ProductInvItem });
  /**  Product-ProductInvItem */
  Product.hasMany(ProductInvItem, { as: 'productInvItems' });
  ProductInvItem.belongsTo(Product);
  /**  invItem-suppliment */
  Suppliment.belongsTo(InvItem);
  InvItem.hasMany(Suppliment);

  /** INVENTORY-RBAC RELATIONS */
  /**  user-damages */
  Damages.belongsTo(User);
  User.hasMany(Damages, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });

  /** ORDER-PRODUCTS RELATIONS */
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

  /** RBAC-SALES RELATIONS */
  /**  user-order */
  Order.belongsTo(User, {
    foreignKey: 'createdBy',
    foreignKeyConstraint: true,
  });
  User.hasMany(Order);

  /* SYNCING */
  await dbConfig
    .sync()
    .then(() => log.info('database created and syncronized'))
    .catch((err) => log.info('couldnt synchronize db', err));
};
