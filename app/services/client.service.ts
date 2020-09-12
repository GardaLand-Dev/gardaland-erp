import config from '../config';
import authHeader from '../helpers/auth-header';

function getClients(all = false, limit: number = null, page: number = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/clients`);
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

function createClient(
  firstname: string,
  lastname: string,
  tel: string = null,
  email: string = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      firstname,
      lastname,
      tel,
      email,
    }),
  };
  return fetch(`${config.apiUrl}/client`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
const clientService = {
  createClient,
  getClients,
};
export default clientService;
