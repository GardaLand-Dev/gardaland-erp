/**
 * sechedule a job
 * check if the server is available
 * initiate connection
 * be invoked on every transaction
 * send count order of today
 */
import io from 'socket.io-client';
import { Op, fn, col } from 'sequelize';
import log from 'electron-log';
// eslint-disable-next-line import/no-cycle
import { FinancialAccount, Order, RestaurantCreds } from '../db/models';

const url = 'http://localhost:3000/';
const socket = io(url);

const dateHelper = (d: Date): Date => {
  if (d.getHours() < 7) {
    const newd = new Date(d.getMilliseconds() - 24 * 3600 * 1000);
    return new Date(newd.setHours(7, 0, 0));
  }
  return new Date(d.setHours(7, 0, 0));
};
export const serverRTSync = async () => {
  log.info('sending data');
  const fAValue = (await FinancialAccount.findOne()).value;
  const d = await Order.findAndCountAll({
    attributes: [[fn('sum', col('totalPrice')), 'total']],
    where: {
      createdAt: {
        [Op.gt]: dateHelper(new Date()),
      },
      canceled: false,
    },
    group: ['canceled'],
  });
  socket.emit('RTSync', { today: d, fAValue });
};

export default socket;
