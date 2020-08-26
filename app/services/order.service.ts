// import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** family */
type OrderType = {
  order_products: {
    product_id: string;
    quantity: number;
    suppliments?: { suppliment_id: string; quantity: number }[];
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

const orderService = {
  createOrder,
};
export default orderService;
