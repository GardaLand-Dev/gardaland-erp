import { Application } from 'express';
import { getAuthChecker } from '../middlewares/rbac';
import StationController from '../controllers/production/statics/stationController';
import FamilyController from '../controllers/production/statics/familyController';
import ProductController from '../controllers/production/statics/productController';
import StockableController from '../controllers/production/inventory/stockableController';
import OrderController from '../controllers/production/order/orderController';
import SupplimentController from '../controllers/production/statics/supplimentController';
import PrinterController from '../controllers/production/statics/printerController';

export default class ProductionRoutes {
  public static route(app: Application) {
    const path = '/api';
    /** STATICS */
    // Suppliment
    app.get(
      `${path}/suppliment`,
      getAuthChecker('prod/suppliment:view'),
      SupplimentController.getSuppliment
    );
    app.post(
      `${path}/suppliment`,
      getAuthChecker('prod/suppliment:create'),
      SupplimentController.createSuppliment
    );
    app.put(`${path}/suppliment`, getAuthChecker('prod/suppliment:update'));
    app.delete(
      `${path}/suppliment`,
      getAuthChecker('prod/suppliment:delete'),
      SupplimentController.deleteSuppliment
    );

    app.get(
      `${path}/Suppliments`,
      getAuthChecker('prod/suppliments:view'),
      SupplimentController.getSuppliments
    );

    // Product
    app.get(
      `${path}/product`,
      getAuthChecker('prod/product:view'),
      ProductController.getProduct
    );
    app.post(
      `${path}/product`,
      getAuthChecker('prod/product:create'),
      ProductController.createProduct
    );
    app.put(`${path}/product`, getAuthChecker('prod/product:update'));
    app.delete(
      `${path}/product`,
      getAuthChecker('prod/product:delete'),
      ProductController.deleteProduct
    );

    app.get(
      `${path}/products`,
      getAuthChecker('prod/products:view'),
      ProductController.getProducts
    );

    // Family
    app.get(
      `${path}/family`,
      getAuthChecker('prod/family:view'),
      FamilyController.getFamily
    );
    app.post(
      `${path}/family`,
      getAuthChecker('prod/family:create'),
      FamilyController.createFamily
    );
    app.put(
      `${path}/family`,
      getAuthChecker('prod/family:update'),
      FamilyController.updateFamily
    );
    app.delete(
      `${path}/family`,
      getAuthChecker('prod/family:delete'),
      FamilyController.deleteFamily
    );

    app.get(
      `${path}/families`,
      getAuthChecker('prod/families:view'),
      FamilyController.getFamilies
    );

    // Station
    app.get(
      `${path}/station`,
      getAuthChecker('prod/station:view'),
      StationController.getStation
    );
    app.post(
      `${path}/station`,
      getAuthChecker('prod/station:create'),
      StationController.createStation
    );
    app.put(
      `${path}/station`,
      getAuthChecker('prod/station:update'),
      StationController.updateStation
    );
    app.delete(
      `${path}/station`,
      getAuthChecker('prod/station:delete'),
      StationController.deleteStation
    );

    app.get(
      `${path}/stations`,
      getAuthChecker('prod/stations:view'),
      StationController.getStations
    );

    // printers
    app.get(
      `${path}/printers`,
      getAuthChecker('prod/printers:view'),
      PrinterController.getPrinters
    );
    //
    /** INVENTORY */
    // Stockable
    app.get(
      `${path}/stockable`,
      getAuthChecker('inventory/stockable:view'),
      StockableController.getStockable
    );
    app.post(
      `${path}/stockable`,
      getAuthChecker('inventory/stockable:create'),
      StockableController.createStockable
    );
    app.put(
      `${path}/stockable`,
      getAuthChecker('inventory/stockable:update'),
      StockableController.updateStockable
    );
    app.delete(
      `${path}/stockable`,
      getAuthChecker('inventory/stockable:delete'),
      StockableController.deleteStockable
    );

    app.get(
      `${path}/stockables`,
      getAuthChecker('inventory/stockables:view'),
      StockableController.getStockables
    );

    // Supplier
    app.get(`${path}/supplier`, getAuthChecker('inventory/supplier:view'));
    app.post(`${path}/supplier`, getAuthChecker('inventory/supplier:create'));
    app.put(`${path}/supplier`, getAuthChecker('inventory/supplier:update'));
    app.delete(`${path}/supplier`, getAuthChecker('inventory/supplier:delete'));

    app.get(`${path}/suppliers`, getAuthChecker('inventory/suppliers:view'));

    // Supply
    app.get(`${path}/supply`, getAuthChecker('inventory/supply:view'));
    app.post(`${path}/supply`, getAuthChecker('inventory/supply:create'));
    app.put(`${path}/supply`, getAuthChecker('inventory/supply:update'));
    app.delete(`${path}/supply`, getAuthChecker('inventory/supply:delete'));

    app.get(`${path}/supplies`, getAuthChecker('inventory/supplies:view'));

    /** HUMAIN RESOURCES */
    // Employee
    app.get(`${path}/employee`, getAuthChecker('hr/employee:view'));
    app.post(`${path}/employee`, getAuthChecker('hr/employee:create'));
    app.put(`${path}/employee`, getAuthChecker('hr/employee:update'));
    app.delete(`${path}/employee`, getAuthChecker('hr/employee:delete'));

    app.get(`${path}/employees`, getAuthChecker('hr/employees:view'));

    // Attendence
    app.get(`${path}/attendance`, getAuthChecker('hr/attendance:view'));
    app.post(`${path}/attendance`, getAuthChecker('hr/attendance:create'));
    app.put(`${path}/attendance`, getAuthChecker('hr/attendance:update'));
    app.delete(`${path}/attendance`, getAuthChecker('hr/attendance:delete'));

    app.get(`${path}/attendances`, getAuthChecker('hr/attendances:view'));

    // Title
    app.get(`${path}/title`, getAuthChecker('hr/title:view'));
    app.post(`${path}/title`, getAuthChecker('hr/title:create'));
    app.put(`${path}/title`, getAuthChecker('hr/title:update'));
    app.delete(`${path}/title`, getAuthChecker('hr/title:delete'));

    app.get(`${path}/titles`, getAuthChecker('hr/titles:view'));

    // Salary
    app.get(`${path}/salary`, getAuthChecker('hr/salary:view'));
    app.post(`${path}/salary`, getAuthChecker('hr/salary:create'));
    app.put(`${path}/salary`, getAuthChecker('hr/salary:update'));
    app.delete(`${path}/salary`, getAuthChecker('hr/salary:delete'));

    app.get(`${path}/salaries`, getAuthChecker('hr/salaries:view'));

    // Payroll
    app.get(`${path}/payroll`, getAuthChecker('hr/payroll:view'));
    app.post(`${path}/payroll`, getAuthChecker('hr/payroll:create'));
    app.put(`${path}/payroll`, getAuthChecker('hr/payroll:update'));
    app.delete(`${path}/payroll`, getAuthChecker('hr/payroll:delete'));

    app.get(`${path}/payrolls`, getAuthChecker('hr/payrolls:view'));

    /** ORDERS */
    // Order
    app.get(`${path}/order`, getAuthChecker('orders/order:view'));
    app.post(
      `${path}/order`,
      getAuthChecker('orders/order:create'),
      OrderController.createOrder
    );
    app.put(`${path}/order`, getAuthChecker('orders/order:update'));
    app.delete(`${path}/order`, getAuthChecker('orders/order:delete'));

    app.get(`${path}/orders`, getAuthChecker('orders/orders:view'));

    // OrderProduct
    app.get(`${path}/orderproduct`, getAuthChecker('orders/orderproduct:view'));
    app.post(
      `${path}/orderproduct`,
      getAuthChecker('orders/orderproduct:create')
    );
    app.put(
      `${path}/orderproduct`,
      getAuthChecker('orders/orderproduct:update')
    );
    app.delete(
      `${path}/orderproduct`,
      getAuthChecker('orders/orderproduct:delete')
    );

    app.get(
      `${path}/orderproducts`,
      getAuthChecker('orders/orderproducts:view')
    );
  }
}
