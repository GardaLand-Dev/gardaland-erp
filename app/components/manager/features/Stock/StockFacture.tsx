import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';

const columns = [
  {
    name: 'Référence',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Fournisseur',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Status de Paiement',
    selector: 'isPaid',
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.isPaid === 'Payé',
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
        },
      },
    ],
  },
  {
    name: 'Somme',
    selector: 'amount',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
  },
];
const data = [
  {
    id: '4543256543',
    name: 'Sliman',
    isPaid: 'Payé',
    amount: '300000.00 DA',
    createdAt: '01/09/2020',
  },
];
const fournisseurs = [
  {
    id: 'sliman',
    name: 'Sliman',
  },
  {
    id: 'azzouz',
    name: 'Azzouz',
  },
];
const Products = [
  {
    id: 'pizza',
    name: 'pizza viande',
  },
  {
    id: 'sandwich',
    name: 'sandwich viande',
  },
];
export default function StockFacture(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [factureParams, setFactureParams] = useState<{
    fname?: string;
    stockItems: {
      id: string;
      name?: string;
      quantity?: string;
      prix?: number;
    }[];
  }>({ stockItems: [] });
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Factures"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Facture"
      >
        <Autocomplete
          className="my-3"
          onChange={(_event: any, newValue: any | null) => {
            setFactureParams({
              ...factureParams,
              fname: newValue ? newValue.id : null,
            });
          }}
          options={fournisseurs}
          getOptionLabel={(option) => option.name}
          fullWidth
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              required
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Fournisseurs"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          className="mb-4"
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(_event: any, newValue: any | null) => {
            console.log(newValue);
            setFactureParams({
              ...factureParams,
              stockItems: [
                ...factureParams?.stockItems,
                {
                  id: newValue ? newValue.id : null,
                  name: newValue ? newValue.name : null,
                },
              ],
            });
          }}
          options={Products}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="stockable"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Référence</th>
              <th scope="col">Stockable</th>
              <th scope="col">Quantity</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>
            {factureParams?.stockItems.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>
                  <TextField type="number" />
                </td>
                <td>
                  <TextField type="number" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleModal>
    </div>
  );
}
