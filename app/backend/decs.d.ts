/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
declare module '@journeyapps/sqlcipher' {
  import events = require('events');

  export const OPEN_READONLY: number;
  export const OPEN_READWRITE: number;
  export const OPEN_CREATE: number;
  export const OPEN_SHAREDCACHE: number;
  export const OPEN_PRIVATECACHE: number;
  export const OPEN_URI: number;

  export const cached: {
    Database(
      filename: string,
      callback?: (this: Database, err: Error | null) => void
    ): Database;
    Database(
      filename: string,
      mode?: number,
      callback?: (this: Database, err: Error | null) => void
    ): Database;
  };

  export interface RunResult extends Statement {
    lastID: number;
    changes: number;
  }

  export class Statement {
    bind(callback?: (err: Error | null) => void): this;
    bind(...params: any[]): this;

    reset(callback?: (err: null) => void): this;

    finalize(callback?: (err: Error) => void): Database;

    run(callback?: (err: Error | null) => void): this;
    run(
      params: any,
      callback?: (this: RunResult, err: Error | null) => void
    ): this;
    run(...params: any[]): this;

    get(callback?: (err: Error | null, row?: any) => void): this;
    get(
      params: any,
      callback?: (this: RunResult, err: Error | null, row?: any) => void
    ): this;
    get(...params: any[]): this;

    all(callback?: (err: Error | null, rows: any[]) => void): this;
    all(
      params: any,
      callback?: (this: RunResult, err: Error | null, rows: any[]) => void
    ): this;
    all(...params: any[]): this;

    each(
      callback?: (err: Error | null, row: any) => void,
      complete?: (err: Error | null, count: number) => void
    ): this;
    each(
      params: any,
      callback?: (this: RunResult, err: Error | null, row: any) => void,
      complete?: (err: Error | null, count: number) => void
    ): this;
    each(...params: any[]): this;
  }

  export class Database extends events.EventEmitter {
    constructor(filename: string, callback?: (err: Error | null) => void);
    constructor(
      filename: string,
      mode?: number,
      callback?: (err: Error | null) => void
    );

    close(callback?: (err: Error | null) => void): void;

    run(
      sql: string,
      callback?: (this: RunResult, err: Error | null) => void
    ): this;
    run(
      sql: string,
      params: any,
      callback?: (this: RunResult, err: Error | null) => void
    ): this;
    run(sql: string, ...params: any[]): this;

    get(
      sql: string,
      callback?: (this: Statement, err: Error | null, row: any) => void
    ): this;
    get(
      sql: string,
      params: any,
      callback?: (this: Statement, err: Error | null, row: any) => void
    ): this;
    get(sql: string, ...params: any[]): this;

    all(
      sql: string,
      callback?: (this: Statement, err: Error | null, rows: any[]) => void
    ): this;
    all(
      sql: string,
      params: any,
      callback?: (this: Statement, err: Error | null, rows: any[]) => void
    ): this;
    all(sql: string, ...params: any[]): this;

    each(
      sql: string,
      callback?: (this: Statement, err: Error | null, row: any) => void,
      complete?: (err: Error | null, count: number) => void
    ): this;
    each(
      sql: string,
      params: any,
      callback?: (this: Statement, err: Error | null, row: any) => void,
      complete?: (err: Error | null, count: number) => void
    ): this;
    each(sql: string, ...params: any[]): this;

    exec(
      sql: string,
      callback?: (this: Statement, err: Error | null) => void
    ): this;

    prepare(
      sql: string,
      callback?: (this: Statement, err: Error | null) => void
    ): Statement;
    prepare(
      sql: string,
      params: any,
      callback?: (this: Statement, err: Error | null) => void
    ): Statement;
    prepare(sql: string, ...params: any[]): Statement;

    serialize(callback?: () => void): void;
    parallelize(callback?: () => void): void;

    on(event: 'trace', listener: (sql: string) => void): this;
    on(event: 'profile', listener: (sql: string, time: number) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'open' | 'close', listener: () => void): this;
    on(event: string, listener: (...args: any[]) => void): this;

    configure(option: 'busyTimeout', value: number): void;
    interrupt(): void;
  }

  export function verbose(): sqlite3;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface sqlite3 {
    OPEN_READONLY: number;
    OPEN_READWRITE: number;
    OPEN_CREATE: number;
    OPEN_SHAREDCACHE: number;
    OPEN_PRIVATECACHE: number;
    OPEN_URI: number;
    cached: typeof cached;
    RunResult: RunResult;
    Statement: typeof Statement;
    Database: typeof Database;
    verbose(): this;
  }
}

declare module '@thiagoelg/node-printer' {
  /** Declaration file generated by dts-gen */

  /**
   * return user defined printer, according to https://www.cups.org/documentation.php/doc-2.0/api-cups.html#cupsGetDefault2 :
   * "Applications should use the cupsGetDests and cupsGetDest functions to get the user-defined default printer,
   * as this function does not support the lpoptions-defined default printer"
   */
  export function getDefaultPrinterName(): string;

  export function getJob(printerName: string, jobId: number): any;

  /** Get printer info with jobs
   * @param printerName printer name to extract the info
   * @return printer object info:
   *		TODO: to enum all possible attributes
   */
  export function getPrinter(printerName: string): any;

  /** Get printer driver options includes advanced options like supported paper size
   * @param printerName printer name to extract the info (default printer used if printer is not provided)
   * @return printer driver info:
   */
  export function getPrinterDriverOptions(printerName: string): any;

  export function getPrinters(): any;
  /** Finds selected paper size pertaining to the specific printer out of all supported ones in driver_options
   * @param printerName printer name to extract the info (default printer used if printer is not provided)
   * @return selected paper size
   */
  export function getSelectedPaperSize(printerName: string): any;

  export function getSupportedJobCommands(): any;

  export function getSupportedPrintFormats(): any;

  /*
 print raw data. This function is intend to be asynchronous
 parameters:
 parameters - Object, parameters objects with the following structure:
 data - String, mandatory, data to printer
 printer - String, optional, name of the printer, if missing, will try to print to default printer
 docname - String, optional, name of document showed in printer status
 type - String, optional, only for wind32, data type, one of the RAW, TEXT
 options - JS object with CUPS options, optional
 success - Function, optional, callback function
 error - Function, optional, callback function if exists any error
 or
 data - String, mandatory, data to printer
 printer - String, optional, name of the printer, if missing, will try to print to default printer
 docname - String, optional, name of document showed in printer status
 type - String, optional, data type, one of the RAW, TEXT
 options - JS object with CUPS options, optional
 success - Function, optional, callback function with first argument job_id
 error - Function, optional, callback function if exists any error
 */
  type PrintDirectParams = {
    data: any;
    printer: any;
    docname: any;
    type: any;
    options: any;
    success: any;
    error: any;
  };
  export function printDirect(
    parameters?: PrintDirectParams,
    ...args: any[]
  ): void;

  /**
parameters:
   parameters - Object, parameters objects with the following structure:
      filename - String, mandatory, data to printer
      docname - String, optional, name of document showed in printer status
      printer - String, optional, mane of the printer, if missed, will try to retrieve the default printer name
      success - Function, optional, callback function
      error - Function, optional, callback function if exists any error
*/
  export function printFile(parameters: any, ...args: any[]): any;

  export function setJob(printerName: string, jobId: number, command: any): any;
}
