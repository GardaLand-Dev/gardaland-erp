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
    body: JSON.stringify({ name, unit, isIngredient, alertQuantity, inStock }),
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

const inventorySerivce = {
  createInvItem,
  getInvItems,
};
export default inventorySerivce;
