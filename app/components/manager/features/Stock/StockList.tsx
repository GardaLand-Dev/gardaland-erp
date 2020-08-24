import React, { useState } from 'react';
import {
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Autocomplete } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';

const data = [
  {
    id: 'Viande',
    update: '30/08/2020',
    Quantité: '20 kg',
  },
  {
    id: 'Poulet',
    update: '04/08/2020',
    Quantité: '10 kg',
  },
  {
    id: 'coca',
    update: '30/08/2020',
    Quantité: '200 kg',
  },
  {
    id: 'fromage',
    update: '30/08/2020',
    Quantité: '200 kg',
  },
];

const columns = [
  {
    name: 'Produit',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Quantité',
    selector: 'Quantité',
    sortable: true,
  },
  {
    name: 'last update',
    selector: 'update',
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
const unité = [
  {
    title: 'kg',
  },
  {
    title: 'g',
  },
  {
    title: 'piece',
  },
  {
    title: 'litre',
  },
];
export default function StockList(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
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
      >
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Nom"
          variant="outlined"
        />
        <Autocomplete
          options={unité}
          getOptionLabel={(option) => option.title}
          style={{ width: '100%' }}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="unité" variant="outlined" />
          )}
        />
        <TextField
          className="my-3"
          id="outlined-number"
          label="Quantité"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <FormControlLabel
          className="m-3"
          control={<Checkbox />}
          label="isIngredient"
        />
      </SimpleModal>
    </div>
  );
}
