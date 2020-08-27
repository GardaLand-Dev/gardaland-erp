import { Request, Response } from 'express';
import printer from '@thiagoelg/node-printer';
import { successResponse, failureResponse } from '../../common/service';

class PrinterController {
  public static getPrinters(req: Request, res: Response) {
    try {
      const printers = printer.getPrinters();
      if (printers)
        successResponse(
          'printers retrieved successfuly',
          printers.map((p) => ({ name: p.name, status: p.status })),
          res
        );
      else failureResponse('coudnt retrieve printers', {}, res);
    } catch (err) {
      failureResponse('coudnt retrieve printers', err, res);
    }
  }
}

export default PrinterController;
