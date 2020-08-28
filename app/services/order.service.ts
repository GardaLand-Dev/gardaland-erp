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
  return fetch(`${config.apiUrl}/order`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
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

const orderService = {
  createOrder,
  updateOrder,
  cancelOrder,
};
export default orderService;
