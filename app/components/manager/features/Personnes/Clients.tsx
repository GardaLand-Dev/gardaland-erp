import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IconButton, TextField, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import clientService from '../../../../services/client.service';

const columns = [
  {
    name: 'Nom',
    selector: 'lastname',
    sortable: true,
  },
  {
    name: 'Prénom',
    selector: 'firstname',
    sortable: true,
  },
  {
    name: 'Téléphone',
    selector: 'tel',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
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
// const data = [
//   {
//     lastname: 'Cristiano',
//     firstname: 'Ronaldo',
//     tel: '0444355654',
//     email: 'rbenzmi@gmail.com',
//   },
// ];
export default function Clients(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [data, setData] = useState<
    {
      firstname: string;
      lastname: string;
      tel: string;
      email: string;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [clientParams, setClientParams] = useState<{
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
  }>();
  const dataLoader = () => {
    clientService
      .getClients()
      .then((c) => {
        return setData(
          c.map((p) => ({
            firstname: p.firstname,
            lastname: p.lastname,
            email: p.email,
            tel: p.tel,
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clientService
      .createClient(
        clientParams.firstname,
        clientParams.lastname,
        clientParams.tel,
        clientParams.email
      )
      .then((ok) => {
        if (ok) {
          setOpen(true);
          setModalVisible(false);
          dataLoader();
          console.log('employee added ', ok);
        } else console.log('employee not created');
        return true;
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Client"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Client ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Client"
        onSubmit={handleCreate}
      >
        <Grid container spacing={2} className="my-2">
          <Grid item xs>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              onChange={
                (e) =>
                  setClientParams({
                    ...clientParams,
                    lastname: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Prénom"
              variant="outlined"
              onChange={
                (e) =>
                  setClientParams({
                    ...clientParams,
                    firstname: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs>
            <TextField
              className="mb-3"
              fullWidth
              id="outlined-basic"
              label="Téléphone"
              variant="outlined"
              onChange={
                (e) =>
                  setClientParams({
                    ...clientParams,
                    tel: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={
                (e) =>
                  setClientParams({
                    ...clientParams,
                    email: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
        </Grid>
      </SimpleModal>
    </div>
  );
}
