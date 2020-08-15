import jwt from 'jsonwebtoken';
import config from '../config';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response: Response) {
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

function login(user_name, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ user_name, password }),
  };
  return fetch(`${config.apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

const userService = {
  login,
  logout,
};
export default userService;
