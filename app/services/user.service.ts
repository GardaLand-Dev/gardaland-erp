import jwt from 'jsonwebtoken';
import config from '../config';
import authHeader from '../helpers/auth-header';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('jwt');
  localStorage.removeItem('loggedInfo');
}

function handleResponse(response: Response) {
  /**
   * TODO: if login is successful and user has admin/manager role
   * suggest to login as manager
   */
  return response.text().then((text) => {
    const jsonResponse = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error =
        (jsonResponse && jsonResponse.MESSAGE) || response.statusText;
      throw new Error(error);
    } else {
      return {
        data: jwt.decode(jsonResponse.DATA),
        token: jsonResponse.DATA,
      };
    }
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  return fetch(`${config.apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('jwt', JSON.stringify(user.token));
      return <
        {
          id: string;
          userName: string;
          employeeId: string;
          roles: { id: string; name: string }[];
        }
      >user.data;
    });
}

function getRoles(all = false, limit: number = null, page: number = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/rbac/roles`);
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
function createUser(
  employeeId: string,
  userName: string,
  password: string,
  roles: Array<string>
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      employeeId,
      userName,
      password,
      roles,
    }),
  };
  return fetch(`${config.apiUrl}/rbac/user`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getUsers(
  all = false,
  limit: number = null,
  page: number = null,
  incRoles = true,
  incEmployee = true
) {
  const params = { all, limit, page, incRoles, incEmployee };
  const url = new URL(`${config.apiUrl}/rbac/users`);
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
const userService = {
  login,
  logout,
  getRoles,
  createUser,
  getUsers,
};
export default userService;
