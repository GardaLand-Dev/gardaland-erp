import { Application } from 'express';
import { getAuthChecker } from '../middlewares/rbac';

export default class ProductionRoutes {
  public static route(app: Application) {
    const path = '/api';
    /** STATICS */
    // Suppliment
    app.get(`${path}/suppliment`, getAuthChecker('prod/suppliment:view'));
    app.post(`${path}/suppliment`, getAuthChecker('prod/suppliment:create'));
    app.put(`${path}/suppliment`, getAuthChecker('prod/suppliment:update'));
    app.delete(`${path}/suppliment`, getAuthChecker('prod/suppliment:delete'));

    app.get(`${path}/Suppliments`, getAuthChecker('prod/suppliments:view'));

    // Product
    app.get(`${path}/product`, getAuthChecker('prod/product:view'));
    app.post(`${path}/product`, getAuthChecker('prod/product:create'));
    app.put(`${path}/product`, getAuthChecker('prod/product:update'));
    app.delete(`${path}/product`, getAuthChecker('prod/product:delete'));

    app.get(`${path}/products`, getAuthChecker('prod/products:view'));

    // Family
    app.get(`${path}/family`, getAuthChecker('prod/family:view'));
    app.post(`${path}/family`, getAuthChecker('prod/family:create'));
    app.put(`${path}/family`, getAuthChecker('prod/family:update'));
    app.delete(`${path}/family`, getAuthChecker('prod/family:delete'));

    app.get(`${path}/families`, getAuthChecker('prod/families:view'));

    // Station
    app.get(`${path}/station`, getAuthChecker('prod/station:view'));
    app.post(`${path}/station`, getAuthChecker('prod/station:create'));
    app.put(`${path}/station`, getAuthChecker('prod/station:update'));
    app.delete(`${path}/station`, getAuthChecker('prod/station:delete'));

    app.get(`${path}/stations`, getAuthChecker('prod/stations:view'));

    /** INVENTORY */
    // Stockable
    app.get(`${path}/stockable`, getAuthChecker('inventory/stockable:view'));
    app.post(`${path}/stockable`, getAuthChecker('inventory/stockable:create'));
    app.put(`${path}/stockable`, getAuthChecker('inventory/stockable:update'));
    app.delete(
      `${path}/stockable`,
      getAuthChecker('inventory/stockable:delete')
    );

    app.get(`${path}/stockables`, getAuthChecker('inventory/stockables:view'));

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
    app.post(`${path}/order`, getAuthChecker('orders/order:create'));
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
