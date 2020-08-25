// import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

/** family */
function createFamily(name: string, station_id = null) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({ name, station_id }),
  };
  return fetch(`${config.apiUrl}/family`, requestOptions)
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}

const staticService = {
  createFamily,
};
export default staticService;
