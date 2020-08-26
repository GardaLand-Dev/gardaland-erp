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
    .then((res: Response) => {
      return res.ok;
    })
    .catch((err) => err);
}

const staticService = {
  createFamily,
};
export default staticService;
