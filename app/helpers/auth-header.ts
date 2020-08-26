import jwt from 'jsonwebtoken';

export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('jwt'));
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export function getDecoded() {
  const token = JSON.parse(localStorage.getItem('jwt'));
  if (token) {
    return jwt.decode(token);
  }
  return false;
}
