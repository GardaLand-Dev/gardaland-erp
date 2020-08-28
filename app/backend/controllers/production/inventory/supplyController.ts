// import { Request, Response } from 'express';
// import { FindOptions, Includeable } from 'sequelize/types';
// import { SupplyCreationAttributes } from '../../../db/models/supply/type';
// import {
//   successResponse,
//   dbError,
//   insufficientParameters,
//   failureResponse,
// } from '../../common/service';
// import { DEFAULT_LIMIT, Supply, Supplier, Stockable } from '../../../db/models';

// export default class SupplyController {
//   public static createSupply(req: Request, res: Response) {
//     if (
//       req.body.name &&
//       req.body.unit &&
//       req.body.alertQuantity &&
//       typeof req.body.unit === 'string' &&
//       typeof req.body.name === 'string' &&
//       typeof req.body.isIngredient === 'boolean' &&
//       typeof req.body.alertQuantity === 'number'
//     ) {
//       const supplyParams: SupplyCreationAttributes = {
//         name: (<string>req.body.name).normalize().toLowerCase(),
//         unit: (<string>req.body.unit).normalize().toLowerCase(),
//         isIngredient: req.body.isIngredient,
//         quantity: req.body.quantity,
//         alertQuantity: req.body.alertQuantity,
//       };
//       Supply.create(supplyParams)
//         .then((supplyData) =>
//           successResponse('create supply successfull', supplyData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static getSupply(req: Request, res: Response) {
//     if (
//       (req.query.id && typeof req.query.id === 'string') ||
//       (req.query.name && typeof req.query.name === 'string')
//     ) {
//       const filter = req.query.id
//         ? { id: req.query.id }
//         : {
//             name: (<string>req.query.name).normalize().toLowerCase(),
//           };
//       const supplyFilter = { where: filter };
//       Supply.findOne(supplyFilter)
//         .then((supplyData) =>
//           successResponse('get supply successfull', supplyData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static updateSupply(req: Request, res: Response) {
//     if (
//       (req.body.id && typeof req.body.id === 'string') ||
//       (req.body.name && typeof req.body.name === 'string')
//     ) {
//       const filter = req.body.id
//         ? { id: req.body.id }
//         : {
//             name: (<string>req.body.name).normalize().toLowerCase(),
//           };
//       const supplyFilter = { where: filter };
//       Supply.findOne(supplyFilter)
//         .then((supplyData) => {
//           if (!supplyData) throw new Error("couldn't find supply");
//           const supplyParams: SupplyCreationAttributes = {
//             name: req.body.name
//               ? (<string>req.body.name).normalize().toLowerCase()
//               : supplyData.name,
//             unit:
//               req.body.unit && typeof req.body.unit === 'string'
//                 ? (<string>req.body.unit).normalize().toLowerCase()
//                 : supplyData.unit,
//             isIngredient:
//               req.body.isIngredient &&
//               typeof req.body.isIngredient === 'boolean'
//                 ? req.body.isIngredient
//                 : supplyData.isIngredient,
//             quantity:
//               req.body.quantity && typeof req.body.quantity === 'number'
//                 ? req.body.quantity
//                 : supplyData.quantity,
//             alertQuantity:
//               req.body.alertQuantity &&
//               typeof req.body.alertQuantity === 'number'
//                 ? req.body.alertQuantity
//                 : supplyData.alertQuantity,
//           };
//           supplyData.setAttributes(supplyParams);
//           return supplyData.save();
//         })
//         .then((supplyData) =>
//           successResponse('supply update sucessful', supplyData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   // TODO: you may need to activate paranoid or custom isdeleted scope
//   public static deleteSupply(req: Request, res: Response) {
//     if (req.body.id) {
//       const supplyFilter = { where: { id: req.body.id } };
//       Supply.findOne(supplyFilter)
//         .then((supplyData) => {
//           if (!supplyData) throw new Error('cant find supply');
//           return supplyData.destroy();
//         })
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static getSupplies(req: Request, res: Response) {
//     const limit =
//       typeof req.query.limit === 'number' && req.query.limit > 0
//         ? req.query.limit
//         : DEFAULT_LIMIT;
//     const offset =
//       typeof req.query.page === 'number' && req.query.page > 0
//         ? (req.query.page - 1) * limit
//         : 0;
//     const options: FindOptions<import('../../../db/models/supply/type').Supply> = {
//       limit,
//       offset,
//       order: [],
//       include: [],
//     };
//     if (req.query.incSupplier === 'true')
//       (<Includeable[]>options.include).push({ model: Supplier });
//     if (req.query.incStockable === 'true')
//       (<Includeable[]>options.include).push({ model: Stockable });
//     if (req.query.orderDateDesc === 'true')
//       (<Array<any>>options.order).push(['createdAt', 'DESC']);
//     // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
//     Supply.findAll(options)
//       .then((suppliesData) =>
//         successResponse('Supplies retrieved', suppliesData, res)
//       )
//       .catch((err) => failureResponse('couldnt retrieve Supplies', err, res));
//   }
// }
