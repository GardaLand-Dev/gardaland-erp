import config from '../config';
import authHeader from '../helpers/auth-header';

function getEmployees(all = false, limit: number = null, page: number = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/employees`);
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

function createEmployee(
  firstName: string,
  lastName: string,
  title: string,
  address: string = null,
  email: string = null,
  tel: string = null,
  salary: number,
  hourlyRate: number,
  user: {
    username: string;
    password: string;
    roles: Array<string>;
  } = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      firstName,
      lastName,
      title,
      address,
      email,
      tel,
      salary,
      hourlyRate,
      user,
    }),
  };
  return fetch(`${config.apiUrl}/employee`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
const grhService = {
  createEmployee,
  getEmployees,
};
export default grhService;
