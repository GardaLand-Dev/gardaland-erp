import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Invoice } from './type';

export default function InvoiceFactory(
  sequelize: Sequelize
): ModelCtor<Invoice> {
  return sequelize.define('invoices', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    amount: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    note: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
}
