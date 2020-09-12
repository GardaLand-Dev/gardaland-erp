import config from '../config';
import authHeader from '../helpers/auth-header';

function getExpenses(all = false, limit: number = null, page: number = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/expenses`);
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

function createExpense(note: string, amount: number, createdAt: Date) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      note,
      amount,
      createdAt,
    }),
  };
  return fetch(`${config.apiUrl}/expense`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
function getInvoices(all = false, limit: number = null, page: number = null) {
  const params = { all, limit, page };
  const url = new URL(`${config.apiUrl}/invoices`);
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

function createInvoice(
  supplierId: string,
  note: string = null,
  amount: number,
  createdAt: Date,
  isPaid: boolean,
  dueDate: Date = null
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify({
      supplierId,
      note,
      amount,
      createdAt,
      isPaid,
      dueDate,
    }),
  };
  return fetch(`${config.apiUrl}/invoice`, requestOptions)
    .then((res: Response) => res.ok)
    .catch((err) => err);
}
const financeService = {
  createExpense,
  getExpenses,
  createInvoice,
  getInvoices,
};
export default financeService;
