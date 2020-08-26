import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import objectHash from 'object-hash';
import { OrderCreationAttributes } from '../../../db/models/order/type';
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
} from '../../../db/models';

export default class OrderController {
  public static async createOrder(req: Request, res: Response) {
    // eslint-disable-next-line no-constant-condition
    if (req.body.orderProducts && req.body.num) {
      const t = await dbConfig.transaction();
      try {
        const orderParams: OrderCreationAttributes = {
          num: req.body.num, // req.body.num,
        };
        // const tempdebug = {
        //   order_products: [
        //     {
        //       product_id: '1425c5a8-c595-4cb8-ad2e-fb7c08f0682d',
        //       quantity: 1,
        //       suppliments: [
        //         { suppliment_id: 'sid1', quantity: 1 },
        //         { suppliment_id: 'sid2', quantity: 1 },
        //         { suppliment_id: 'sid3', quantity: 1 },
        //       ],
        //     },
        //   ],
        // };

        // create order
        const o = await Order.create(orderParams, { transaction: t });
        if (!o) throw new Error('coudnt create user');

        const opDict: { [opQtHash: string]: string[] } = {};
        const ops = await OrderProduct.bulkCreate(
          req.body.orderProducts.map(
            (op: { product_id: string; quantity: number }) => ({
              orderId: o.id,
              productId: op.product_id,
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
              product_id: string;
              quantity: number;
              suppliments?: { suppliment_id: string; quantity: number }[];
            }
          ) => {
            const hash = objectHash({
              productId: value.product_id,
              quantity: value.quantity,
            });
            const opid = opDict[hash].pop();
            if (value.suppliments && value.suppliments.length && opid) {
              return acc.concat(
                value.suppliments.map((sp) => ({
                  orderProductId: opid,
                  supplimentId: sp.suppliment_id,
                  quantity: sp.quantity,
                }))
              );
            }
            return acc;
          },
          []
        );
        // eslint-disable-next-line no-console
        console.log(opspsIns);
        const opsps = await OrderProductSuppliment.bulkCreate(opspsIns, {
          transaction: t,
        });
        if (!opsps) throw new Error('coudnt create orderProductSuppliment');
        t.commit()
          .then(() =>
            successResponse('order created successfully', o.toJSON(), res)
          )
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
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
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

  // public static deleteOrder(req: Request, res: Response) {
  //   if (req.body.id) {
  //     const orderFilter = { where: { id: req.body.id } };
  //     Order.findOne(orderFilter)
  //       .then((orderData) => {
  //         if (!orderData) throw new Error('cant find order');
  //         orderData.toBeArchived = true;
  //         return orderData.save();
  //       })
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  public static getOrders(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/order/type').Order> = {
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
