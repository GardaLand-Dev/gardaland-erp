import { Application } from 'express';
import path from 'path';
import multer from 'multer';
import { getAuthChecker } from '../middlewares/rbac';
import StationController from '../controllers/production/statics/stationController';
import FamilyController from '../controllers/production/statics/familyController';
import ProductController from '../controllers/production/statics/productController';
import InvItemController from '../controllers/production/inventory/invItemController';
import OrderController from '../controllers/production/order/orderController';
import SupplimentController from '../controllers/production/statics/supplimentController';
import PrinterController from '../controllers/production/statics/printerController';

export default class ProductionRoutes {
  public static route(app: Application) {
    const api = '/api';
    const upload = multer({ dest: path.join('./', 'uploads') });
    /** STATICS */
    // Suppliment
    app.get(
      `${api}/suppliment`,
      getAuthChecker('prod/suppliment:view'),
      SupplimentController.getSuppliment
    );
    app.post(
      `${api}/suppliment`,
      getAuthChecker('prod/suppliment:create'),
      SupplimentController.createSuppliment
    );
    app.put(`${api}/suppliment`, getAuthChecker('prod/suppliment:update'));
    app.delete(
      `${api}/suppliment`,
      getAuthChecker('prod/suppliment:delete'),
      SupplimentController.deleteSuppliment
    );

    app.get(
      `${api}/Suppliments`,
      getAuthChecker('prod/suppliments:view'),
      SupplimentController.getSuppliments
    );

    // Product
    app.get(
      `${api}/product`,
      getAuthChecker('prod/product:view'),
      ProductController.getProduct
    );
    app.post(
      `${api}/product`,
      getAuthChecker('prod/product:create'),
      ProductController.createProduct
    );
    app.put(`${api}/product`, getAuthChecker('prod/product:update'));
    app.delete(
      `${api}/product`,
      getAuthChecker('prod/product:delete'),
      ProductController.deleteProduct
    );

    app.get(
      `${api}/products`,
      getAuthChecker('prod/products:view'),
      ProductController.getProducts
    );

    app.post(
      `${api}/thumbnail`,
      getAuthChecker('prod/product:update'),
      upload.single('thumbnail'),
      ProductController.updateThumbnail
    );

    // Family
    app.get(
      `${api}/family`,
      getAuthChecker('prod/family:view'),
      FamilyController.getFamily
    );
    app.post(
      `${api}/family`,
      getAuthChecker('prod/family:create'),
      FamilyController.createFamily
    );
    app.put(
      `${api}/family`,
      getAuthChecker('prod/family:update'),
      FamilyController.updateFamily
    );
    app.delete(
      `${api}/family`,
      getAuthChecker('prod/family:delete'),
      FamilyController.deleteFamily
    );

    app.get(
      `${api}/families`,
      getAuthChecker('prod/families:view'),
      FamilyController.getFamilies
    );

    // Station
    app.get(
      `${api}/station`,
      getAuthChecker('prod/station:view'),
      StationController.getStation
    );
    app.post(
      `${api}/station`,
      getAuthChecker('prod/station:create'),
      StationController.createStation
    );
    app.put(
      `${api}/station`,
      getAuthChecker('prod/station:update'),
      StationController.updateStation
    );
    app.delete(
      `${api}/station`,
      getAuthChecker('prod/station:delete'),
      StationController.deleteStation
    );

    app.get(
      `${api}/stations`,
      getAuthChecker('prod/stations:view'),
      StationController.getStations
    );

    // printers
    app.get(
      `${api}/printers`,
      getAuthChecker('prod/printers:view'),
      PrinterController.getPrinters
    );
    //
    /** INVENTORY */
    // InvItem
    app.get(
      `${api}/invItem`,
      getAuthChecker('inventory/invItem:view'),
      InvItemController.getInvItem
    );
    app.post(
      `${api}/invItem`,
      getAuthChecker('inventory/invItem:create'),
      InvItemController.createInvItem
    );
    app.put(
      `${api}/invItem`,
      getAuthChecker('inventory/invItem:update'),
      InvItemController.updateInvItem
    );
    app.delete(
      `${api}/invItem`,
      getAuthChecker('inventory/invItem:delete'),
      InvItemController.deleteInvItem
    );

    app.get(
      `${api}/invItems`,
      getAuthChecker('inventory/invItems:view'),
      InvItemController.getInvItems
    );

    // Supplier
    app.get(`${api}/supplier`, getAuthChecker('inventory/supplier:view'));
    app.post(`${api}/supplier`, getAuthChecker('inventory/supplier:create'));
    app.put(`${api}/supplier`, getAuthChecker('inventory/supplier:update'));
    app.delete(`${api}/supplier`, getAuthChecker('inventory/supplier:delete'));

    app.get(`${api}/suppliers`, getAuthChecker('inventory/suppliers:view'));

    // Supply
    app.get(`${api}/supply`, getAuthChecker('inventory/supply:view'));
    app.post(`${api}/supply`, getAuthChecker('inventory/supply:create'));
    app.put(`${api}/supply`, getAuthChecker('inventory/supply:update'));
    app.delete(`${api}/supply`, getAuthChecker('inventory/supply:delete'));

    app.get(`${api}/supplies`, getAuthChecker('inventory/supplies:view'));

    /** HUMAIN RESOURCES */
    // Employee
    app.get(`${api}/employee`, getAuthChecker('hr/employee:view'));
    app.post(`${api}/employee`, getAuthChecker('hr/employee:create'));
    app.put(`${api}/employee`, getAuthChecker('hr/employee:update'));
    app.delete(`${api}/employee`, getAuthChecker('hr/employee:delete'));

    app.get(`${api}/employees`, getAuthChecker('hr/employees:view'));

    // Attendence
    app.get(`${api}/attendance`, getAuthChecker('hr/attendance:view'));
    app.post(`${api}/attendance`, getAuthChecker('hr/attendance:create'));
    app.put(`${api}/attendance`, getAuthChecker('hr/attendance:update'));
    app.delete(`${api}/attendance`, getAuthChecker('hr/attendance:delete'));

    app.get(`${api}/attendances`, getAuthChecker('hr/attendances:view'));

    // Title
    app.get(`${api}/title`, getAuthChecker('hr/title:view'));
    app.post(`${api}/title`, getAuthChecker('hr/title:create'));
    app.put(`${api}/title`, getAuthChecker('hr/title:update'));
    app.delete(`${api}/title`, getAuthChecker('hr/title:delete'));

    app.get(`${api}/titles`, getAuthChecker('hr/titles:view'));

    // Salary
    app.get(`${api}/salary`, getAuthChecker('hr/salary:view'));
    app.post(`${api}/salary`, getAuthChecker('hr/salary:create'));
    app.put(`${api}/salary`, getAuthChecker('hr/salary:update'));
    app.delete(`${api}/salary`, getAuthChecker('hr/salary:delete'));

    app.get(`${api}/salaries`, getAuthChecker('hr/salaries:view'));

    // Payroll
    app.get(`${api}/payroll`, getAuthChecker('hr/payroll:view'));
    app.post(`${api}/payroll`, getAuthChecker('hr/payroll:create'));
    app.put(`${api}/payroll`, getAuthChecker('hr/payroll:update'));
    app.delete(`${api}/payroll`, getAuthChecker('hr/payroll:delete'));

    app.get(`${api}/payrolls`, getAuthChecker('hr/payrolls:view'));

    /** ORDERS */
    // Order
    app.get(`${api}/order`, getAuthChecker('orders/order:view'));
    app.post(
      `${api}/order`,
      getAuthChecker('orders/order:create'),
      OrderController.createOrder
    );
    app.put(`${api}/order`, getAuthChecker('orders/order:update'));
    app.delete(
      `${api}/order`,
      getAuthChecker('orders/order:delete'),
      OrderController.deleteOrder
    );

    app.get(
      `${api}/orders`,
      getAuthChecker('orders/orders:view'),
      OrderController.getOrders
    );

    // OrderProduct
    app.get(`${api}/orderproduct`, getAuthChecker('orders/orderproduct:view'));
    app.post(
      `${api}/orderproduct`,
      getAuthChecker('orders/orderproduct:create')
    );
    app.put(
      `${api}/orderproduct`,
      getAuthChecker('orders/orderproduct:update')
    );
    app.delete(
      `${api}/orderproduct`,
      getAuthChecker('orders/orderproduct:delete')
    );

    app.get(
      `${api}/orderproducts`,
      getAuthChecker('orders/orderproducts:view')
    );
  }
}
