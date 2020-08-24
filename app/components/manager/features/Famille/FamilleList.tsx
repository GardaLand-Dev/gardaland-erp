import React, { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';

const columns = [
  {
    name: 'famille',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'emplacement',
    selector: 'emplacement',
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
const data = [
  {
    id: 'Pizza',
    emplacement: 'Pizza Printer',
  },
  {
    id: 'Sandwich',
    emplacement: 'Sandwich printer',
  },
  {
    id: 'Tacos',
    emplacement: 'Tacos Printer',
  },
];
const Emplacement = [
  {
    title: 'Pizza Printer',
  },
  {
    title: 'Sandwich Printer',
  },
  {
    title: 'Tacos Printer',
  },
];
export default function FamilleList(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="liste des familles"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Famille"
      >
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Nom de famille"
          variant="outlined"
        />
        <Autocomplete
          options={Emplacement}
          getOptionLabel={(option) => option.title}
          style={{ width: '100%' }}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="emplacement" variant="outlined" />
          )}
        />
      </SimpleModal>
    </div>
  );
}
