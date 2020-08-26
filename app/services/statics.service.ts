// import jwt from 'jsonwebtoken';
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
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      all,
      limit,
      page,
    }),
  };
  return fetch(`${config.apiUrl}/stations`, requestOptions)
    .then((res: Response) => res.json())
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
function getFamilies(all = false, limit = null, page = null) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      all,
      limit,
      page,
    }),
  };
  return fetch(`${config.apiUrl}/familiess`, requestOptions)
    .then((res: Response) => res.json())
    .catch((err) => err);
}

/** product */
function createProduct(
  name: string,
  priceTtc: number,
  tva: number = null,
  ingredients: Array<{
    stockableId: string;
    quantity: number;
  }>,
  isComposed: boolean,
  stockableId: string = null,
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
      ingredients,
      stockableId,
      familyId,
    }),
  };
  return fetch(`${config.apiUrl}/product`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getProducts(all = false, limit = null, page = null) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      all,
      limit,
      page,
    }),
  };
  return fetch(`${config.apiUrl}/products`, requestOptions)
    .then((res: Response) => res.json())
    .catch((err) => err);
}

/** suppliment */
function createSuppliment(
  name: string,
  price: number,
  quantity: number,
  stockableId: string
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
      stockableId,
    }),
  };
  return fetch(`${config.apiUrl}/suppliment`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getSuppliments(all = false, limit = null, page = null) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      all,
      limit,
      page,
    }),
  };
  return fetch(`${config.apiUrl}/suppliments`, requestOptions)
    .then((res: Response) => res.json())
    .catch((err) => err);
}

const staticService = {
  createStation,
  getStations,
  createFamily,
  getFamilies,
  createProduct,
  getProducts,
  createSuppliment,
  getSuppliments,
};
export default staticService;
