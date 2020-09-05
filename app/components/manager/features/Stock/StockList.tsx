import React, { useState, useEffect } from 'react';
import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import inventoryService from '../../../../services/inventory.service';

// const data = [
//   {
//     id: 'Viande',
//     update: '30/08/2020',
//     Quantité: '20 kg',
//   },
//   {
//     id: 'Poulet',
//     update: '04/08/2020',
//     Quantité: '10 kg',
//   },
//   {
//     id: 'coca',
//     update: '30/08/2020',
//     Quantité: '200 kg',
//   },
//   {
//     id: 'fromage',
//     update: '30/08/2020',
//     Quantité: '200 kg',
//   },
// ];

const columns = [
  {
    name: 'InvItem',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Quantité',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Unité',
    selector: 'unit',
    sortable: true,
  },
  {
    name: 'Alert Quantité',
    selector: 'alertQuantity',
    sortable: true,
  },
  {
    name: 'Ingrédient',
    selector: 'isIngredient',
    sortable: true,
  },
  {
    name: 'last update',
    selector: 'updatedAt',
    sortable: true,
  },
  {
    name: 'Modifier',
    cell: function editButton(row) {
      return (
        // eslint-disable-next-line no-console
        <IconButton onClick={() => console.log(row)}>
          <EditOutlinedIcon />
        </IconButton>
      );
    },
    button: true,
  },
];
// const unité = [
//   {
//     title: 'kg',
//   },
//   {
//     title: 'g',
//   },
//   {
//     title: 'piece',
//   },
//   {
//     title: 'litre',
//   },
// ];
export default function StockList(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [stockParams, setStockParams] = useState<{
    name: string;
    unit: string;
    quantity: number;
    isIngredient: boolean;
    alertQuantity: number;
  }>();
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      quantity: number;
      unit: string;
      isIngredient: boolean;
      alertQuantity: number;
    }[]
  >([]);
  useEffect(() => {
    inventoryService
      .getInvItems()
      .then((d) => {
        console.log(d);
        return setData(
          d.map((s) => ({
            id: s.id,
            name: s.name,
            quantity: s.quantity,
            unit: s.unit,
            isIngredient: s.isIngredient ? 'Oui' : 'Non',
            alertQuantity: s.alertQuantity,
            updatedAt: new Date(Date.parse(s.updatedAt)).toDateString(),
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inventoryService
      .createInvItem(
        stockParams.name,
        stockParams.unit,
        stockParams.isIngredient,
        stockParams.alertQuantity,
        stockParams.quantity
      )
      .then((ok) =>
        console.log('invItem add (exit modal and refresh data)', ok)
      )
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="liste des stock"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
        title="Ajouter stock"
        // eslint-disable-next-line no-console
        onSubmit={handleCreate}
      >
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Nom"
          variant="outlined"
          onChange={(e) => {
            setStockParams({
              ...stockParams,
              name: e.target.value,
            });
          }}
        />
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="unité"
          variant="outlined"
          onChange={(e) => {
            setStockParams({
              ...stockParams,
              unit: e.target.value,
            });
          }}
        />
        <TextField
          className="my-3 mr-1"
          id="outlined-number"
          label="Quantité"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => {
            setStockParams({
              ...stockParams,
              quantity: parseFloat(e.target.value),
            });
          }}
        />
        <TextField
          className="my-3 ml-2"
          id="outlined-number"
          label="Alert Quantité"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => {
            setStockParams({
              ...stockParams,
              alertQuantity: parseFloat(e.target.value),
            });
          }}
        />
        <FormControlLabel
          className="my-3 ml-2"
          control={<Checkbox />}
          label="isIngredient"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStockParams({
              ...stockParams,
              isIngredient: e.target.checked,
            });
          }}
        />
      </SimpleModal>
    </div>
  );
}
