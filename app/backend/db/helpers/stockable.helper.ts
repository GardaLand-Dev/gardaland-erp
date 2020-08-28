import { Op, Transaction } from 'sequelize';
import { Stockable } from '../models';

async function updateStockables(
  stockableQtDict: { [id: string]: number },
  transaction: Transaction = null
) {
  const stockables = await Stockable.findAll({
    where: {
      id: {
        [Op.in]: Object.keys(stockableQtDict),
      },
    },
    transaction,
  });
  stockables.forEach(async (s) => {
    s.quantity += stockableQtDict[s.id];
    await s.save({ transaction });
  });
}

const StockableHelper = {
  updateStockables,
};

export default StockableHelper;
