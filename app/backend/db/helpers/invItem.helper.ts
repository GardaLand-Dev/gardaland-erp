import { Op, Transaction } from 'sequelize';
import { InvItem } from '../models';

async function updateInvItems(
  invItemQtDict: { [id: string]: number },
  transaction: Transaction = null
) {
  const invItems = await InvItem.findAll({
    where: {
      id: {
        [Op.in]: Object.keys(invItemQtDict),
      },
    },
    transaction,
  });
  invItems.forEach(async (s) => {
    s.inStock += invItemQtDict[s.id];
    await s.save({ transaction });
  });
}

const InvItemHelper = {
  updateInvItems,
};

export default InvItemHelper;
