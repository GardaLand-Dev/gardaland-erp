import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';

const columns = [
  {
    name: 'Nom',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Téléphone',
    selector: 'tel',
    sortable: true,
  },
  {
    name: 'Adresse',
    selector: 'address',
    sortable: true,
  },
];
const data = [
  {
    name: 'Sliman',
    tel: '077777777',
    address: 'Firem chlef',
  },
];
export default function Fournisseurs(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [fournisseurParams, setFournisseurParams] = useState<{
    name: string;
    tel: string;
    address: string;
  }>();
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Fournisseur"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Fournisseur"
      >
        <TextField
          className="my-3"
          required
          fullWidth
          id="outlined-basic"
          label="Nom"
          variant="outlined"
          onChange={
            (e) =>
              setFournisseurParams({
                ...fournisseurParams,
                name: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <TextField
          className="mb-3"
          required
          fullWidth
          id="outlined-basic"
          label="Téléphone"
          variant="outlined"
          onChange={
            (e) =>
              setFournisseurParams({
                ...fournisseurParams,
                tel: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <TextField
          className="mb-3"
          fullWidth
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          onChange={
            (e) =>
              setFournisseurParams({
                ...fournisseurParams,
                address: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
      </SimpleModal>
    </div>
  );
}
