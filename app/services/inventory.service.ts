// import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** invItem */
function createInvItem(
  name: string,
  unit: string,
  isIngredient: boolean,
  alertQuantity: number,
  inStock: number = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      name,
      unit,
      isIngredient: isIngredient === undefined ? false : isIngredient,
      alertQuantity,
      inStock,
    }),
  };
  return fetch(`${config.apiUrl}/invItem`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function getInvItems(
  all = false,
  limit: number = null,
  page: number = null,
  ingredient = false
) {
  const params = { ingredient, all, limit, page };
  const url = new URL(`${config.apiUrl}/invItems`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(
      p[0],
      // eslint-disable-next-line no-nested-ternary
      typeof p[1] === 'boolean' ? (p[1] ? 'true' : 'false') : String(p[1])
    )
  );
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
  };
  return fetch(url.href, requestOptions)
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.STATUS !== 'SUCCESS') throw new Error(data.MESSAGE);
      return data.DATA;
    })
    .catch((err) => err);
}
/** supplies */
function createSupply(
  supplierId: string,
  dueDate: Date,
  deliveredOn: Date,
  supplies: { quantity: number; cost: number; invItemId: string }[],
  note: string,
  isPaid: boolean
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      supplierId,
      dueDate,
      deliveredOn,
      supplies,
      note,
      isPaid,
    }),
  };
  return fetch(`${config.apiUrl}/supply`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function getSupplies(
  all = false,
  limit: number = null,
  page: number = null,
  invoiceId: string = null
) {
  const params = { all, limit, page, invoiceId };
  const url = new URL(`${config.apiUrl}/supplies`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(
      p[0],
      // eslint-disable-next-line no-nested-ternary
      typeof p[1] === 'boolean' ? (p[1] ? 'true' : 'false') : String(p[1])
    )
  );
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
  };
  return fetch(url.href, requestOptions)
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.STATUS !== 'SUCCESS') throw new Error(data.MESSAGE);
      return data.DATA;
    })
    .catch((err) => err);
}
function getInvoices(
  all = false,
  limit: number = null,
  page: number = null,
  incInvItems = false,
  incSupplier = true,
  incSupplies = false,
  orderDateDesc = true
) {
  const params = {
    all,
    limit,
    page,
    incSupplies,
    orderDateDesc,
    incInvItems,
    incSupplier,
  };
  const url = new URL(`${config.apiUrl}/supplyInvoices`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(
      p[0],
      // eslint-disable-next-line no-nested-ternary
      typeof p[1] === 'boolean' ? (p[1] ? 'true' : 'false') : String(p[1])
    )
  );
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
  };
  return fetch(url.href, requestOptions)
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.STATUS !== 'SUCCESS') throw new Error(data.MESSAGE);
      return data.DATA;
    })
    .catch((err) => err);
}
/** suppliers */
function createSupplier(
  name: string,
  tel: string = null,
  address: string = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      name,
      tel,
      address,
    }),
  };
  return fetch(`${config.apiUrl}/supplier`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function getSuppliers(
  all = false,
  limit: number = null,
  page: number = null,
  incInvoices = false
) {
  const params = { all, limit, page, incSupplies: incInvoices };
  const url = new URL(`${config.apiUrl}/suppliers`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(
      p[0],
      // eslint-disable-next-line no-nested-ternary
      typeof p[1] === 'boolean' ? (p[1] ? 'true' : 'false') : String(p[1])
    )
  );
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
  };
  return fetch(url.href, requestOptions)
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.STATUS !== 'SUCCESS') throw new Error(data.MESSAGE);
      return data.DATA;
    })
    .catch((err) => err);
}

const inventorySerivce = {
  createInvItem,
  getInvItems,
  createSupply,
  getSupplies,
  getInvoices,
  createSupplier,
  getSuppliers,
};
export default inventorySerivce;
