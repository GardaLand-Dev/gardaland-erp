import React, { useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IconButton, TextField, Grid } from '@material-ui/core';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';

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
const data = [
  {
    lastname: 'Cristiano',
    firstname: 'Ronaldo',
    tel: '0444355654',
    email: 'rbenzmi@gmail.com',
  },
];
export default function Clients(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [clientParams, setClientParams] = useState<{
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
  }>();
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Client"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Client"
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
