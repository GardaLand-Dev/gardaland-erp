import { Request, Response } from 'express';
import log from 'electron-log';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import { FindOptions, Includeable } from 'sequelize';
import { ProductCreationAttributes } from '../../../db/models/products/product/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import dbConfig, {
  DEFAULT_LIMIT,
  ProductInvItem,
  Product,
  Family,
  InvItem,
} from '../../../db/models';

export default class ProductController {
  public static async createProduct(req: Request, res: Response) {
    if (
      req.body.name &&
      typeof req.body.name === 'string' &&
      typeof req.body.isComposed === 'boolean' &&
      req.body.priceTtc &&
      typeof req.body.priceTtc === 'number' &&
      ((req.body.invItemId &&
        typeof req.body.invItemId === 'string' &&
        !req.body.isComposed) ||
        (req.body.invItems && typeof req.body.invItems === 'object')) &&
      req.body.familyId &&
      typeof req.body.familyId === 'string'
    ) {
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
          // validate invItems
          (<Array<{ id: string; quantity: number }>>req.body.invItems).forEach(
            (row, i) => {
              if (row.quantity < 0)
                throw new Error(
                  `qunatity shouldnt be less than 0 in row ${i + 1}`
                );
            }
          );
          const ps = await ProductInvItem.bulkCreate(
            (<Array<{ id: string; quantity: number }>>req.body.invItems).map(
              (row) => ({
                productId: p.id,
                invItemId: row.id,
                quantity: row.quantity,
              })
            ),
            { transaction: t }
          );
          if (!ps) throw new Error('coudnt create ingredients');
        } else {
          await p.addInvItem(req.body.invItemId, {
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
      (req.query.id && typeof req.query.id === 'string') ||
      (req.query.name && typeof req.query.name === 'string')
    ) {
      const filter = req.query.id
        ? { id: req.query.id }
        : {
            name: (<string>req.query.name).normalize().toLowerCase(),
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
  public static async updateThumbnail(req: Request, res: Response) {
    const productData = await Product.findByPk(req.body.id);
    if (productData) {
      fs.rename(
        path.join('./', req.file.path),
        path.join(
          './',
          'uploads',
          `${productData.id}.${mime.getExtension(req.file.mimetype)}`
        ),
        (err) => {
          if (!err) {
            successResponse('thumbnail update successful', {}, res);
          } else {
            log.error(err);
            failureResponse('coudnt update thumbnail', {}, res);
          }
        }
      );
    } else {
      failureResponse('coudnt update thumbnail', {}, res);
    }
  }

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
      typeof req.query.limit === 'string' &&
      // eslint-disable-next-line no-restricted-globals
      !isNaN(parseInt(req.query.limit, 10)) &&
      parseInt(req.query.limit, 10) > 0
        ? parseInt(req.query.limit, 10)
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'string' &&
      // eslint-disable-next-line no-restricted-globals
      !isNaN(parseInt(req.query.page, 10)) &&
      parseInt(req.query.page, 10) > 0
        ? (parseInt(req.query.page, 10) - 1) * limit
        : 0;
    const options: FindOptions<import('../../../db/models/products/product/type').Product> = {
      limit,
      offset,
      include: [],
    };
    if (req.query.incFamily === 'true')
      (<Includeable[]>options.include).push({ model: Family });
    if (req.query.incInvItems === 'true')
      (<Includeable[]>options.include).push({
        model: InvItem,
        through: { attributes: ['quantity'] },
      });
    if (!(req.query.all === 'true')) options.where = { toBeArchived: false };
    Product.findAll(options)
      .then((productsData) =>
        successResponse('users retrieved', productsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
