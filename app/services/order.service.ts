// import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** family */
type OrderType = {
  id?: string;
  orderProducts: {
    productId: string;
    quantity: number;
    suppliments?: { supplimentId: string; quantity: number }[];
  }[];
  num: number;
  type: string;
  clientId?: string;
};
function createOrder(order: OrderType) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(order),
  };
  return fetch(`${config.apiUrl}/order`, requestOptions).then(
    (res: Response) => {
      return res.ok;
    }
  );
}
function updateOrder(order: OrderType) {
  const requestOptions = {
    method: 'UPDATE',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(order),
  };
  return fetch(`${config.apiUrl}/order`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function cancelOrder(orderId: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ id: orderId }),
  };
  return fetch(`${config.apiUrl}/order`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}

function getOrders(
  all = false,
  incOrderProducts = false,
  incProductSuppliments = false,
  limit: number = null,
  page: number = null
) {
  const params = { all, limit, page, incOrderProducts, incProductSuppliments };
  const url = new URL(`${config.apiUrl}/orders`);
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
      console.log(data);
      if (data.STATUS !== 'SUCCESS') throw new Error(data);
      return data.DATA;
    })
    .catch((err) => err);
}

const orderService = {
  getOrders,
  createOrder,
  updateOrder,
  cancelOrder,
};
export default orderService;
