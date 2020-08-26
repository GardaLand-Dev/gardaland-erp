import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { ProductCreationAttributes } from '../../../db/models/product/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import dbConfig, {
  DEFAULT_LIMIT,
  ProductStockable,
  Product,
} from '../../../db/models';

export default class ProductController {
  public static async createProduct(req: Request, res: Response) {
    if (
      req.body.name &&
      typeof req.body.name === 'string' &&
      typeof req.body.isComposed === 'boolean' &&
      req.body.priceTtc &&
      typeof req.body.priceTtc === 'number' &&
      ((req.body.stockableId &&
        typeof req.body.stockableId === 'string' &&
        !req.body.isComposed) ||
        (req.body.stockables && typeof req.body.stockables === 'object')) &&
      req.body.familyId &&
      typeof req.body.familyId === 'string'
    ) {
      // verify stockable(s) exist(s)

      const t = await dbConfig.transaction();
      try {
        const productParams: ProductCreationAttributes = {
          name: (<string>req.body.name).normalize().toLowerCase(),
          isComposed: req.body.isComposed,
          priceTTC: req.body.priceTtc,
          tva: req.body.tva,
        };
        const p = await Product.create(productParams, { transaction: t });
        if (!p) throw new Error('coudnt create user');
        await p.setFamily(req.body.familyId, { transaction: t });
        if (req.body.isComposed) {
          // validate stockables
          (<Array<{ id: string; quantity: number }>>(
            req.body.stockables
          )).forEach((row, i) => {
            if (row.quantity < 0)
              throw new Error(
                `qunatity shouldnt be less than 0 in row ${i + 1}`
              );
          });
          const ps = await ProductStockable.bulkCreate(
            (<Array<{ id: string; quantity: number }>>req.body.stockables).map(
              (row) => ({
                productId: p.id,
                stockableId: row.id,
                quantity: row.quantity,
              })
            ),
            { transaction: t }
          );
          if (!ps) throw new Error('coudnt create ingredients');
        } else {
          await p.addStockable(req.body.stockableId, {
            through: {
              quantity:
                req.body.quantity && typeof req.body.quantity === 'number'
                  ? req.body.quantity
                  : 1,
            },
            transaction: t,
          });
        }
        t.commit()
          .then(() =>
            successResponse('product created successfully', p.toJSON(), res)
          )
          .catch((err) => dbError(err, res));
      } catch (err) {
        console.log(err);

        t.rollback()
          .then(() => dbError(err, res))
          .catch((err1) => dbError(err1, res));
      }
    } else {
      insufficientParameters(res);
    }
  }

  public static getProduct(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const productFilter = { where: filter };
      Product.findOne(productFilter)
        .then((productData) =>
          successResponse('get product successfull', productData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // public static updateProduct(req: Request, res: Response) {
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
  //     const productFilter = { where: filter };
  //     Product.findOne(productFilter)
  //       .then((productData) => {
  //         if (!productData) throw new Error("couldn't find product");
  //         const productParams: ProductCreationAttributes = {
  //           firstName: req.body.firstName
  //             ? (<string>req.body.firstName).normalize().toLowerCase()
  //             : productData.firstName,
  //           lastName: req.body.lastName
  //             ? (<string>req.body.lastName).normalize().toLowerCase()
  //             : productData.lastName,
  //           email:
  //             req.body.email && typeof req.body.email
  //               ? (<string>req.body.email).normalize().toLowerCase()
  //               : productData.email,
  //           address:
  //             req.body.address && typeof req.body.address
  //               ? (<string>req.body.address).normalize().toLowerCase()
  //               : productData.address,
  //           tel:
  //             req.body.tel && typeof req.body.tel
  //               ? (<string>req.body.tel).normalize().toLowerCase()
  //               : productData.tel,
  //         };
  //         productData.setAttributes(productParams);
  //         return productData.save();
  //       })
  //       .then((productData) =>
  //         successResponse('product update sucessful', productData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  public static deleteProduct(req: Request, res: Response) {
    if (req.body.id) {
      const productFilter = { where: { id: req.body.id } };
      Product.findOne(productFilter)
        .then((productData) => {
          if (!productData) throw new Error('cant find product');
          productData.toBeArchived = true;
          return productData.save();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getProducts(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/product/type').Product> = {
      limit,
      offset,
      where: {
        toBeArchived:
          req.body.archived && typeof req.body.archived === 'boolean'
            ? req.body.archived
            : false,
      },
    };
    Product.findAll(options)
      .then((productsData) =>
        successResponse('users retrieved', productsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
