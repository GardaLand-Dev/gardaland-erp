import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import OrderService from '../../../../services/order.service';
import CustomTable from '../../CustomTable';

const columns = [
  {
    name: 'Numéro de commande',
    selector: 'num',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'createdAt',
    format: (row) => moment(row.createdAt as Date).format('hh:mm | DD/MM/YY'),
    sortable: true,
  },
  {
    name: 'Annulée',
    selector: 'canceled',
    format: (row) => (row.canceled ? 'Oui' : 'Non'),
    sortable: true,
  },
  {
    name: 'Total',
    selector: 'totalPrice',
    format: (row) => `${row.totalPrice} DA`,
    sortable: true,
  },
  {
    name: 'Modifier',
    cell: function editButton(row) {
      return (
        // eslint-disable-next-line no-console
        <IconButton disabled={row.canceled} onClick={() => console.log(row)}>
          <EditOutlinedIcon />
        </IconButton>
      );
    },
    button: true,
  },
];
export default function VenteList(): JSX.Element {
  type DataRow = {
    id: string;
    num: number;
    type: string;
    modified: boolean;
    canceled: boolean;
    totalPrice: number;
    createdAt: Date;
    isDisabled: boolean;
    orderProducts?: {
      id: string;
      quantity: number;
      note?: string;
      productId: string;
      orderProductSuppliments?: {
        supplimentId: string;
        quantity: number;
      }[];
    }[];
  };
  const [data, setData] = useState<DataRow[]>([]);
  const dataLoader = () => {
    OrderService.getOrders(false, true, false, 50, 1)
      .then((d) => {
        if (d) {
          setData(d.map((r) => ({ ...r, isDisabled: r.canceled } as DataRow)));
        }
        return true;
      })
      .catch(console.error);
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const [toggleCleared, setToggleCleared] = useState(false);
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="liste des Ventes"
        clearSelectedRows={toggleCleared}
        onDelete={(selectedRows: any[]) => {
          if (
            // eslint-disable-next-line no-alert
            window.confirm(
              `Etes-vous sûr que vous voulez supprimer la commande numéro :\r ${selectedRows[0].num}?`
            )
          ) {
            OrderService.cancelOrder(selectedRows[0].id)
              .then((ok) => {
                if (ok) dataLoader();
                return true;
              })
              .catch(console.error);
            setToggleCleared(!toggleCleared);
          }
        }}
      />
    </div>
  );
}
