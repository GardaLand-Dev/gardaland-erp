// import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** stockable */
function createStockable(
  name: string,
  unit: string,
  isIngredient: boolean,
  alertQuantity: number,
  quantity: number = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ name, unit, isIngredient, alertQuantity, quantity }),
  };
  return fetch(`${config.apiUrl}/stockable`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}
function getStockables(all = false, limit = null, page = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/stockables`);
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

const stockSerivce = {
  createStockable,
  getStockables,
};
export default stockSerivce;
