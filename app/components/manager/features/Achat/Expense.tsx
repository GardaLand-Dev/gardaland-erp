import React from 'react';
import CustomTable from '../../CustomTable';

const columns = [
  {
    name: 'note',
    selector: 'note',
    sortable: true,
  },
  {
    name: 'Montant',
    selector: 'amount',
    sortable: true,
  },
  {
    name: 'la date de creation',
    selector: 'createdAt',
    sortable: true,
  },
];
const data = [
  {
    note: 'lkhobz',
    amount: '200 DA',
    createdAt: '04/09/2020',
  },
];
export default function Expense(): JSX.Element {
  return (
    <div>
      <CustomTable columns={columns} data={data} title="Dépense" />
    </div>
  );
}
