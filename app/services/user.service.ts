import jwt from 'jsonwebtoken';
import config from '../config';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
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

const userService = {
  login,
  logout,
};
export default userService;
