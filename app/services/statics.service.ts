// import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** station */
function createStation(name: string, printerName = null) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ name, printerName }),
  };
  return fetch(`${config.apiUrl}/station`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function getStations(all = false, limit = null, page = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/stations`);
  Object.entries(params).forEach((p) => url.searchParams.set(p[0], p[1]));
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
function getPrinters() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
  };
  return fetch(`${config.apiUrl}/printers`, requestOptions)
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.STATUS !== 'SUCCESS') throw new Error(data.MESSAGE);
      return data.DATA;
    })
    .catch((err) => err);
}
/** family */
function createFamily(name: string, stationId = null) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ name, stationId }),
  };
  return fetch(`${config.apiUrl}/family`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getFamilies(
  all = false,
  incStation = false,
  incProducts = false,
  limit: number = null,
  page: number = null
) {
  const params = { all, limit, page, incProducts, incStation };
  const url = new URL(`${config.apiUrl}/families`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(p[0], p[1]?.toString())
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

/** product */
function createProduct(
  name: string,
  priceTtc: number,
  tva: number = null,
  ingredients: Array<{
    id: string;
    quantity: number;
  }> = null,
  isComposed: boolean,
  invItemId: string = null,
  familyId: string
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      name,
      priceTtc,
      tva,
      isComposed,
      invItems: ingredients,
      invItemId,
      familyId,
    }),
  };
  return fetch(
    `${config.apiUrl}/product`,
    requestOptions
  ).then((res: Response) => res.json());
}

function updateProductThumbnail(file: File, id: string) {
  const data = new FormData();
  data.append('thumbnail', file, 'thumbnail.jpg');
  data.append('id', id);
  return axios
    .post(`${config.apiUrl}/thumbnail`, data, {
      headers: { Authorization: authHeader().Authorization },
    })
    .then((res) => res.status);
}

function getProducts(
  all = false,
  limit: number = null,
  page: number = null,
  incFamily = true
) {
  const params = { all, limit, page, incFamily };
  const url = new URL(`${config.apiUrl}/products`);
  Object.entries(params).forEach((p) =>
    url.searchParams.set(p[0], p[1]?.toString())
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

/** suppliment */
function createSuppliment(
  name: string,
  price: number,
  quantity: number,
  invItemId: string
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      name,
      quantity,
      price,
      invItemId,
    }),
  };
  return fetch(`${config.apiUrl}/suppliment`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getSuppliments(all = false, limit = null, page = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/suppliments`);
  Object.entries(params).forEach((p) => url.searchParams.set(p[0], p[1]));
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

const staticService = {
  createStation,
  getStations,
  getPrinters,
  createFamily,
  getFamilies,
  createProduct,
  updateProductThumbnail,
  getProducts,
  createSuppliment,
  getSuppliments,
};
export default staticService;
