import { Request, Response } from 'express';
import { FindOptions, Op } from 'sequelize';
import objectHash from 'object-hash';
import {
  OrderCreationAttributes,
  OrderAttributes,
} from '../../../db/models/sales/order/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import dbConfig, {
  DEFAULT_LIMIT,
  Order,
  OrderProduct,
  OrderProductSuppliment,
  Product,
  ProductInvItem,
  Suppliment,
} from '../../../db/models';
import InvItemHelper from '../../../db/helpers/invItem.helper';
import { JwtRequest } from '../../../middlewares/authCheck';

export default class OrderController {
  public static async createOrder(req: JwtRequest, res: Response) {
    // eslint-disable-next-line no-constant-condition
    if (req.body.orderProducts && req.body.num && req.body.type) {
      const t = await dbConfig.transaction();
      try {
        const orderParams: OrderCreationAttributes = {
          num: req.body.num, // req.body.num,
          type: req.body.type,
          createdBy: req.auth.id,
        };
        // create order
        const o = await Order.create(orderParams, { transaction: t });
        if (!o) throw new Error('coudnt create user');

        const opDict: { [opQtHash: string]: string[] } = {};
        const ops = await OrderProduct.bulkCreate(
          req.body.orderProducts.map(
            (op: { productId: string; quantity: number }) => ({
              orderId: o.id,
              productId: op.productId,
              quantity: op.quantity,
            })
          ),
          { transaction: t }
        );
        if (!ops) throw new Error('coudnt create orderProducts');
        ops.forEach((op) => {
          const hash = objectHash({
            productId: op.productId,
            quantity: op.quantity,
          });
          if (opDict[hash]) opDict[hash].push(op.id);
          else opDict[hash] = [op.id];
        });
        // create OrderProductSuppliment
        const opspsIns = req.body.orderProducts.reduce(
          (
            acc: {
              orderProductId: string;
              supplimentId: string;
              quantity: number;
            }[],
            value: {
              productId: string;
              quantity: number;
              suppliments?: { supplimentId: string; quantity: number }[];
            }
          ) => {
            const hash = objectHash({
              productId: value.productId,
              quantity: value.quantity,
            });
            const opid = opDict[hash].pop();
            if (value.suppliments && value.suppliments.length && opid) {
              return acc.concat(
                value.suppliments.map((sp) => ({
                  orderProductId: opid,
                  supplimentId: sp.supplimentId,
                  quantity: sp.quantity,
                }))
              );
            }
            return acc;
          },
          []
        );
        const opsps = await OrderProductSuppliment.bulkCreate(opspsIns, {
          transaction: t,
        });
        if (!opsps) throw new Error('coudnt create orderProductSuppliment');
        t.commit()
          .then(async () => {
            successResponse('order created successfully', o.toJSON(), res);
            const opsInc = await OrderProduct.findAll({
              where: {
                id: { [Op.in]: ops.map((e) => e.id) },
              },
              include: [
                {
                  model: OrderProductSuppliment,
                  as: 'orderProductSuppliments',
                  include: [Suppliment],
                },
                {
                  model: Product,
                  include: [{ model: ProductInvItem, as: 'productInvItems' }],
                },
              ],
            });
            const invItemsDict: { [id: string]: number } = {};
            let total = 0;
            opsInc.forEach((e) => {
              total += e.product.priceTTC * e.quantity;
              e.product.productInvItems.forEach((ee) => {
                invItemsDict[ee.invItemId] =
                  invItemsDict[ee.invItemId] - e.quantity * ee.quantity ||
                  0 - e.quantity * ee.quantity;
              });
              e.orderProductSuppliments.forEach((ee) => {
                total += ee.suppliment.price * e.quantity * ee.quantity;
                invItemsDict[ee.suppliment.invItemId] =
                  invItemsDict[ee.suppliment.invItemId] -
                    e.quantity * ee.quantity * ee.suppliment.quantity ||
                  0 - e.quantity * ee.quantity * ee.suppliment.quantity;
              });
            });
            o.totalPrice = total;
            await o.save();
            return InvItemHelper.updateInvItems(invItemsDict);
          })
          .catch((err) => dbError(err, res));
      } catch (err) {
        console.log('ERRRR COUGHT', err);

        t.rollback()
          .then(() => dbError(err, res))
          .catch((err1) => dbError(err1, res));
      }
    } else {
      insufficientParameters(res);
    }
  }

  public static getOrder(req: Request, res: Response) {
    if (
      (req.query.id && typeof req.query.id === 'string') ||
      (req.query.name && typeof req.query.name === 'string')
    ) {
      const filter = req.query.id
        ? { id: req.query.id }
        : {
            name: (<string>req.query.name).normalize().toLowerCase(),
          };
      const orderFilter = { where: filter };
      Order.findOne(orderFilter)
        .then((orderData) =>
          successResponse('get order successfull', orderData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // public static updateOrder(req: Request, res: Response) {
  //   if (
  //     (req.body.id && typeof req.body.id === 'string') ||
  //     (req.body.fistName &&
  //       typeof req.body.firstName === 'string' &&
  //       req.body.lastName &&
  //       typeof req.body.lastName === 'string')
  //   ) {
  //     const filter = req.body.id
  //       ? { id: req.body.id }
  //       : {
  //           firstName: (<string>req.body.firstName).normalize().toLowerCase(),
  //           lastName: (<string>req.body.lastName).normalize().toLowerCase(),
  //         };
  //     const orderFilter = { where: filter };
  //     Order.findOne(orderFilter)
  //       .then((orderData) => {
  //         if (!orderData) throw new Error("couldn't find order");
  //         const orderParams: OrderCreationAttributes = {
  //           firstName: req.body.firstName
  //             ? (<string>req.body.firstName).normalize().toLowerCase()
  //             : orderData.firstName,
  //           lastName: req.body.lastName
  //             ? (<string>req.body.lastName).normalize().toLowerCase()
  //             : orderData.lastName,
  //           email:
  //             req.body.email && typeof req.body.email
  //               ? (<string>req.body.email).normalize().toLowerCase()
  //               : orderData.email,
  //           address:
  //             req.body.address && typeof req.body.address
  //               ? (<string>req.body.address).normalize().toLowerCase()
  //               : orderData.address,
  //           tel:
  //             req.body.tel && typeof req.body.tel
  //               ? (<string>req.body.tel).normalize().toLowerCase()
  //               : orderData.tel,
  //         };
  //         orderData.setAttributes(orderParams);
  //         return orderData.save();
  //       })
  //       .then((orderData) =>
  //         successResponse('order update sucessful', orderData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  public static async deleteOrder(req: Request, res: Response) {
    if (req.body.id) {
      const t = await dbConfig.transaction();
      // TODO: dont need all attributes use attributes param
      const orderFilter: FindOptions<OrderAttributes> = {
        where: { id: req.body.id },
        include: [
          {
            model: OrderProduct,
            include: [
              {
                model: OrderProductSuppliment,
                as: 'orderProductSuppliments',
                include: [Suppliment],
              },
              {
                model: Product,
                include: [{ model: ProductInvItem, as: 'productInvItems' }],
              },
            ],
          },
        ],
        transaction: t,
      };
      try {
        const orderData = await Order.findOne(orderFilter);
        if (!orderData) throw new Error('cant find order');
        // readjust the stock values
        // i need invItem-quantity(op.quantity)
        // successResponse('TEST didnt delete just getting', orderData, res);
        const invItemQtDict: { [index: string]: number } = {};
        orderData.orderProducts.forEach((op) => {
          op.product.productInvItems.forEach((ps) => {
            invItemQtDict[ps.invItemId] =
              invItemQtDict[ps.invItemId] + op.quantity * ps.quantity ||
              op.quantity * ps.quantity;
          });
          op.orderProductSuppliments.forEach((ops) => {
            invItemQtDict[ops.suppliment.invItemId] =
              invItemQtDict[ops.suppliment.invItemId] +
                ops.quantity * ops.suppliment.quantity * op.quantity ||
              ops.quantity * ops.suppliment.quantity * op.quantity;
          });
        });
        t.commit();
        successResponse('TEST didnt delete just getting', invItemQtDict, res);
        // Print Cancel to adequate printers
        await InvItemHelper.updateInvItems(invItemQtDict);
        // .catch((err) => dbError(err, res));
      } catch (err) {
        t.rollback();
        console.log(err);
        failureResponse('failed to delete order', err, res);
      }
    } else {
      insufficientParameters(res);
    }
  }

  public static getOrders(req: Request, res: Response) {
    const limit =
      typeof req.query.limit === 'number' && req.query.limit > 0
        ? req.query.limit
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'number' && req.query.page > 0
        ? (req.query.page - 1) * limit
        : 0;
    const options: FindOptions<import('../../../db/models/sales/order/type').Order> = {
      limit,
      offset,
    };
    Order.findAll(options)
      .then((ordersData) =>
        successResponse('orders retrieved', ordersData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
