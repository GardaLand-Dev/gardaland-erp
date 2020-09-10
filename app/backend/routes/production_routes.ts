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
import SupplyController from '../controllers/production/inventory/supplyController';
import SupplierController from '../controllers/production/inventory/supplierController';
import EmployeeController from '../controllers/production/humainResources/employeeController';
import AttendanceController from '../controllers/production/humainResources/attendanceController';
import InvoiceController from '../controllers/production/finance/invoiceController';
import ExpenseController from '../controllers/production/finance/expenseController';

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
    app.get(
      `${api}/supplier`,
      getAuthChecker('inventory/supplier:view'),
      SupplierController.getSupplier
    );
    app.post(
      `${api}/supplier`,
      getAuthChecker('inventory/supplier:create'),
      SupplierController.createSupplier
    );
    app.put(
      `${api}/supplier`,
      getAuthChecker('inventory/supplier:update'),
      SupplierController.updateSupplier
    );
    app.delete(
      `${api}/supplier`,
      getAuthChecker('inventory/supplier:delete'),
      SupplierController.deleteSupplier
    );

    app.get(
      `${api}/suppliers`,
      getAuthChecker('inventory/suppliers:view'),
      SupplierController.getSuppliers
    );

    // Supply
    app.get(
      `${api}/supply`,
      getAuthChecker('inventory/supply:view'),
      SupplyController.getSupply
    );
    app.post(
      `${api}/supply`,
      getAuthChecker('inventory/supply:create'),
      SupplyController.createSupply
    );
    app.put(`${api}/supply`, getAuthChecker('inventory/supply:update'));
    app.delete(
      `${api}/supply`,
      getAuthChecker('inventory/supply:delete'),
      SupplyController.deleteSupply
    );

    app.get(
      `${api}/supplyInvoices`,
      getAuthChecker('finance/invoices:view'),
      SupplyController.getInvoices
    );
    app.get(
      `${api}/supplies`,
      getAuthChecker('inventory/supplies:view'),
      SupplyController.getSupplies
    );

    /** HUMAIN RESOURCES */
    // Employee
    app.get(
      `${api}/employee`,
      getAuthChecker('hr/employee:view'),
      EmployeeController.getEmployee
    );
    app.post(
      `${api}/employee`,
      getAuthChecker('hr/employee:create'),
      EmployeeController.createEmployee
    );
    app.put(`${api}/employee`, getAuthChecker('hr/employee:update'));
    app.delete(
      `${api}/employee`,
      getAuthChecker('hr/employee:delete'),
      EmployeeController.deleteEmployee
    );

    app.get(
      `${api}/employees`,
      getAuthChecker('hr/employees:view'),
      EmployeeController.getEmployees
    );

    // Attendence
    app.get(
      `${api}/attendance`,
      getAuthChecker('hr/attendance:view'),
      AttendanceController.getAttendance
    );
    app.post(
      `${api}/attendance`,
      getAuthChecker('hr/attendance:create'),
      AttendanceController.createAttendance
    );
    app.put(
      `${api}/attendance`,
      getAuthChecker('hr/attendance:update'),
      AttendanceController.updateAttendance
    );
    app.delete(
      `${api}/attendance`,
      getAuthChecker('hr/attendance:delete'),
      AttendanceController.deleteAttendance
    );

    app.get(
      `${api}/attendances`,
      getAuthChecker('hr/attendances:view'),
      AttendanceController.getAttendances
    );

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
    app.get(
      `${api}/order`,
      getAuthChecker('orders/order:view'),
      OrderController.getOrder
    );
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

    // Invoice
    app.get(
      `${api}/invoice`,
      getAuthChecker('finance/invoice:view'),
      InvoiceController.getInvoice
    );
    app.post(
      `${api}/invoice`,
      getAuthChecker('finance/invoice:create'),
      InvoiceController.createInvoice
    );
    app.put(
      `${api}/invoice`,
      getAuthChecker('finance/invoice:update'),
      InvoiceController.updateInvoice
    );
    app.delete(
      `${api}/invoice`,
      getAuthChecker('finance/invoice:delete'),
      InvoiceController.deleteInvoice
    );

    app.get(
      `${api}/invoices`,
      getAuthChecker('finance/invoices:view'),
      InvoiceController.getInvoices
    );

    // Expense
    app.get(
      `${api}/expense`,
      getAuthChecker('finance/expense:view'),
      ExpenseController.getExpense
    );
    app.post(
      `${api}/expense`,
      getAuthChecker('finance/expense:create'),
      ExpenseController.createExpense
    );
    app.put(
      `${api}/expense`,
      getAuthChecker('finance/expense:update'),
      ExpenseController.updateExpense
    );
    app.delete(
      `${api}/expense`,
      getAuthChecker('finance/expense:delete'),
      ExpenseController.deleteExpense
    );

    app.get(
      `${api}/expense`,
      getAuthChecker('finance/expense:view'),
      ExpenseController.getExpenses
    );
  }
}
