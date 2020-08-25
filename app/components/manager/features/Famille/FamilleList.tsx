import React, { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
// import staticService from '../../../../services/statics.service';

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
  // const [familyParams, setFamilyParams] = useState({});
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  // const handleFamilyValue = (e) => {
  //   // const a = familyParams;
  //   setFamilyParams(e.target.value);
  // };
  // const handleCreate = () => {
  // staticService
  //   .createFamily(familyName)
  //   .then((ok) => console.log('familly added ', ok))
  //   .catch((err) => console.log(err));
  // };
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(e.currentTarget.elements);
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
        onSubmit={handleCreate}
      >
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="pizza"
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
