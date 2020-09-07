import React, { useState, useEffect } from 'react';
import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Alert } from '@material-ui/lab';
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
    name: 'Article',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Quantité en stock',
    selector: 'inStock',
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
    name: 'Dernière mise à jour',
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
      inStock: number;
      unit: string;
      isIngredient: boolean;
      alertQuantity: number;
    }[]
  >([]);
  const dataLoader = () => {
    inventoryService
      .getInvItems(true)
      .then((d) => {
        console.log(d);
        return setData(
          d.map((s) => ({
            id: s.id,
            name: s.name,
            inStock: `${s.inStock} ${s.unit}`,
            isIngredient: s.isIngredient ? 'Oui' : 'Non',
            alertQuantity: s.alertQuantity,
            updatedAt: new Date(Date.parse(s.updatedAt)).toLocaleString(),
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
      .then((ok) => {
        console.log('invItem add (exit modal and refresh data)', ok);
        if (ok) {
          setOpen(true);
          setModalVisible(false);
          dataLoader();
          return true;
        }
        throw new Error('didnt create');
      })
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Article ajouté avec succès
        </Alert>
      </Snackbar>
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
