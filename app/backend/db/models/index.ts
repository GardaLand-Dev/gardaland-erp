import { Sequelize, Op } from 'sequelize';
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
// eslint-disable-next-line import/no-cycle
import { serverRTSync } from '../../module/telemetery';

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
      storage: path.join('./', 'db.sqlite'),
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
  /**  ProductInvItem-InvItem */
  ProductInvItem.belongsTo(InvItem);

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
  // ############################################################
  // HOOKS
  // ############################################################
  // FinancialAccount Auto update
  FinancialTransaction.addHook(
    'afterCreate',
    (
      fTData: import('./finance/financialTransaction/type').FinancialTransaction,
      options
    ) => {
      const func = () => {
        FinancialAccount.findOne()
          .then(async (fAData) => {
            fTData.caisseValue = fAData.value;
            await fTData.save();
            const typeId = await TransactionType.findByPk(
              fTData.transactionTypeId
            );
            if (typeId.sign === 'POS') {
              fAData.value += fTData.value;
              return fAData.save();
            }
            fAData.value -= fTData.value;
            return fAData.save();
          })
          .then(() => serverRTSync())
          .catch(log.error);
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );
  FinancialTransaction.addHook(
    'beforeUpdate',
    (
      fTData: import('./finance/financialTransaction/type').FinancialTransaction,
      options
    ) => {
      const func = async () => {
        const prev = fTData.previous('value');
        const typeId = await TransactionType.findByPk(
          fTData.getDataValue('transactionTypeId')
        );
        const fA = await FinancialAccount.findOne();
        if (typeId.sign === 'POS') {
          fA.value += fTData.value - prev;
        } else {
          fA.value += prev - fTData.value;
        }
        fA.save()
          .then(() => serverRTSync())
          .catch(log.error);
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );
  FinancialTransaction.addHook(
    'beforeDestroy',
    (
      fTData: import('./finance/financialTransaction/type').FinancialTransaction,
      options
    ) => {
      const func = () => {
        FinancialAccount.findOne()
          .then(async (fAData) => {
            const tType = await TransactionType.findByPk(
              fTData.transactionTypeId
            );
            if (tType.sign === 'NEG') {
              fAData.value += fTData.value;
              return fAData.save();
            }
            fAData.value -= fTData.value;
            return fAData.save();
          })
          .catch(log.error);
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );

  // FinancialTransaction auto create / update
  Order.addHook('afterUpdate', async (orderData, options) => {
    const func = async () => {
      if (orderData.getDataValue('totalPrice') > 0) {
        if (!orderData.getDataValue('financialTransactionId')) {
          const tType = await TransactionType.findOne({
            where: { source: 'order' },
          });
          const fTData = await FinancialTransaction.create({
            transactionTypeId: tType.id,
            value: orderData.getDataValue('totalPrice'),
          });
          if (fTData) {
            orderData.setDataValue('financialTransactionId', fTData.id);
            orderData.save();
          }
        } else {
          const fTDATA = await FinancialTransaction.findByPk(
            orderData.getDataValue('financialTransactionId')
          );
          if (fTDATA && fTDATA.value !== orderData.getDataValue('totalPrice')) {
            fTDATA.value = orderData.getDataValue('totalPrice');
            fTDATA.save();
          }
          if (orderData.getDataValue('canceled')) fTDATA.destroy();
        }
      }
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  Payroll.addHook('beforeCreate', async (payrollData, options) => {
    const func = async () => {
      const tType = await TransactionType.findOne({
        where: { source: 'payroll' },
      });
      const fTData = await FinancialTransaction.create({
        transactionTypeId: tType.id,
        value: payrollData.getDataValue('amount'),
      });
      payrollData.setDataValue('financialTransactionId', fTData.id);
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  Expense.addHook('beforeCreate', async (expenseData, options) => {
    const func = async () => {
      const tType = await TransactionType.findOne({
        where: { source: 'expense' },
      });
      const fTData = await FinancialTransaction.create({
        transactionTypeId: tType.id,
        value: expenseData.getDataValue('amount'),
      });
      expenseData.setDataValue('financialTransactionId', fTData.id);
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  Expense.addHook(
    'beforeUpdate',
    (eData: import('./finance/expense/type').Expense, options) => {
      const func = async () => {
        const prev = eData.previous('amount');
        if (eData.amount !== prev && eData.financialTransactionId) {
          const tData = await FinancialTransaction.findByPk(
            eData.financialTransactionId
          );
          tData.value = eData.amount;
          tData.save();
        }
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );
  Invoice.addHook(
    'beforeCreate',
    async (invoiceData: import('./finance/invoice/type').Invoice, options) => {
      const func = async () => {
        if (invoiceData.isPaid) {
          const tType = await TransactionType.findOne({
            where: { source: 'expense' },
          });
          if (invoiceData.isPaid === true) {
            const fTData = await FinancialTransaction.create({
              transactionTypeId: tType.id,
              value: invoiceData.amount,
            });
            invoiceData.financialTransactionId = fTData.id;
          }
        }
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );
  Invoice.addHook(
    'afterUpdate',
    async (invoiceData: import('./finance/invoice/type').Invoice, options) => {
      const func = async () => {
        const tType = await TransactionType.findOne({
          where: { source: 'expense' },
        });
        if (invoiceData.isPaid === true) {
          if (invoiceData.financialTransactionId) {
            const fTData = await FinancialTransaction.findByPk(
              invoiceData.financialTransactionId
            );
            fTData.value = invoiceData.amount;
            fTData.save();
          } else {
            const fTData = await FinancialTransaction.create({
              transactionTypeId: tType.id,
              value: invoiceData.getDataValue('amount'),
            });
            invoiceData.setDataValue('financialTransactionId', fTData.id);
            invoiceData.save();
          }
        }
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );

  // maxQuantity autoupdate
  Product.addHook('afterUpdate', async (productData, options) => {
    const func = async () => {
      const pi = await Product.findByPk(productData.getDataValue('id'), {
        include: [
          {
            model: ProductInvItem,
            as: 'productInvItems',
            include: [InvItem],
          },
        ],
      });
      if (pi && pi.productInvItems && pi.productInvItems.length > 0) {
        const maxQ = pi.productInvItems.reduce((max, pIIData) => {
          return max > pIIData.invItem.inStock
            ? Math.floor(pIIData.invItem.inStock / pIIData.quantity)
            : max;
        }, Infinity);
        pi.maxQuantity = maxQ;
        pi.save();
      }
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  InvItem.addHook(
    'beforeUpdate',
    async (
      invItemData: import('./inventory/invItem/type').InvItem,
      options
    ) => {
      const func = async () => {
        const prevQ = invItemData.previous('inStock');
        // const prevQ = (await InvItem.findByPk(invItemData.getDataValue('id')))
        //   .inStock;
        // updating products
        const pIIsData = await ProductInvItem.findAll({
          where: { invItemId: invItemData.id },
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductInvItem,
                  as: 'productInvItems',
                  include: [InvItem],
                },
              ],
            },
          ],
        });
        log.info(
          'beforesavehook',
          prevQ,
          invItemData.getDataValue('inStock'),
          pIIsData.length
        );
        if (pIIsData && pIIsData.length > 0) {
          pIIsData.forEach((pIIData) => {
            const qq = Math.floor(
              invItemData.getDataValue('inStock') / pIIData.quantity
            );
            if (
              // quantity decrease
              prevQ > invItemData.getDataValue('inStock') &&
              pIIData.product.maxQuantity > qq
            ) {
              pIIData.product.maxQuantity = qq;
              pIIData.product.save();
            }
            // quantity increase
            if (prevQ < invItemData.getDataValue('inStock')) {
              // recalculate maxq
              const maxQ = pIIData.product.productInvItems.reduce(
                (max, pIIData2) => {
                  return max > pIIData2.invItem.inStock
                    ? Math.floor(pIIData2.invItem.inStock / pIIData2.quantity)
                    : max;
                },
                Infinity
              );
              pIIData.product.maxQuantity = maxQ;
              pIIData.product.save();
            }
          });
        }
        const suppliesData = await Supply.findAll({
          where: {
            invItemId: invItemData.id,
            consumedOn: null,
          },
          order: [['createdAt', 'DESC']],
        });
        if (
          prevQ > invItemData.inStock &&
          suppliesData &&
          suppliesData.length > 0
        ) {
          log.debug(suppliesData.length, suppliesData);
          let toConsume = prevQ - invItemData.inStock;
          let i = 0;
          while (toConsume > 0 && i < suppliesData.length) {
            if (suppliesData[i].remaining - toConsume > 0) {
              suppliesData[i].remaining -= toConsume;
            } else {
              toConsume -= suppliesData[i].remaining;
              suppliesData[i].remaining = 0;
              suppliesData[i].consumedOn = new Date();
            }
            suppliesData[i].save();
            i += 1;
          }
        }
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );

  // inStock auto update
  Damages.addHook('afterCreate', (damagesData, options) => {
    const func = () => {
      InvItem.findByPk(damagesData.getDataValue('id'))
        .then((invItemData) =>
          invItemData.decrement('inStock', {
            by: damagesData.getDataValue('quantity'),
          })
        )
        .catch(log.error);
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  Supply.addHook('afterCreate', (supplyData, options) => {
    const func = () => {
      supplyData.setDataValue('remaining', supplyData.getDataValue('quantity'));
      supplyData.save();
      InvItem.findByPk(supplyData.getDataValue('invItemId'))
        .then((invItemData) =>
          invItemData.increment('inStock', {
            by: supplyData.getDataValue('quantity'),
          })
        )
        .catch(log.error);
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });
  Supply.addHook(
    'beforeUpdate',
    (supplyData: import('./inventory/supply/type').Supply, options) => {
      const func = () => {
        const prevQ = supplyData.previous('quantity');
        if (prevQ !== supplyData.quantity) {
          supplyData.remaining += supplyData.quantity - prevQ;
          InvItem.findByPk(supplyData.getDataValue('invItemId'))
            .then((invItemData) =>
              invItemData.increment('inStock', {
                by: supplyData.getDataValue('quantity'),
              })
            )
            .catch(log.error);
        }
      };
      if (options.transaction) options.transaction.afterCommit(func);
      else func();
    }
  );
  Supply.addHook('afterBulkCreate', (suppliesData, options) => {
    const func = () => {
      suppliesData.forEach(async (supplyData) => {
        supplyData.setDataValue(
          'remaining',
          supplyData.getDataValue('quantity')
        );
        supplyData.save();
        const invItemData = await InvItem.findByPk(
          supplyData.getDataValue('invItemId')
        );
        invItemData.inStock += supplyData.getDataValue('quantity');
        await invItemData.save();
      });
    };
    if (options.transaction) options.transaction.afterCommit(func);
    else func();
  });

  //
  OrderProduct.addHook('beforeBulkCreate', async (orderProductsData) => {
    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: orderProductsData.map((op) => op.getDataValue('productId')),
        },
      },
    });
    const prodDict = new Map();
    products.forEach((p) => {
      prodDict.set(p.id, p.maxQuantity);
    });
    orderProductsData.forEach((op) => {
      if (
        op.getDataValue('quantity') > prodDict.get(op.getDataValue('productId'))
      )
        throw new Error('not enough ingredients in stock');
    });
  });

  /* SYNCING */
  await dbConfig
    .sync()
    .then(() => log.info('database created and syncronized'))
    .then(async () => {
      await TransactionType.findOrCreate({
        where: { source: 'order' },
        defaults: { source: 'order', sign: 'POS' },
      });
      await TransactionType.findOrCreate({
        where: { source: 'expense' },
        defaults: { source: 'expense', sign: 'NEG' },
      });
      await TransactionType.findOrCreate({
        where: { source: 'payroll' },
        defaults: { source: 'payroll', sign: 'NEG' },
      });
      await TransactionType.findOrCreate({
        where: { source: 'invoice' },
        defaults: { source: 'invoice', sign: 'NEG' },
      });
      await FinancialAccount.findOrCreate({
        where: {},
        defaults: { value: 0 },
      });

      return true;
    })
    .catch((err) => log.info('couldnt synchronize db', err));
};
