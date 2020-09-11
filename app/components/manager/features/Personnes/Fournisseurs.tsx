import React, { useState, useEffect } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import inventorySerivce from '../../../../services/inventory.service';

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

export default function Fournisseurs(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      address: string;
      tel: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);
  const dataLoader = () => {
    inventorySerivce
      .getSuppliers(true)
      .then((d) => {
        setData(d);
        return true;
      })
      .catch(console.error);
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const [fournisseurParams, setFournisseurParams] = useState<{
    name: string;
    tel: string;
    address: string;
  }>();
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Fournisseur"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Fournisseur ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
          setFournisseurParams(null);
        }}
        visible={modalVisible}
        title="Ajouter Fournisseur"
        onSubmit={(e) => {
          e.preventDefault();
          inventorySerivce
            .createSupplier(
              fournisseurParams.name,
              fournisseurParams.tel,
              fournisseurParams.address
            )
            .then((ok) => {
              if (!ok) throw new Error('supplier not created');
              dataLoader();
              setModalVisible(false);
              setOpen(true);
              return true;
            })
            .catch(console.error);
        }}
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
