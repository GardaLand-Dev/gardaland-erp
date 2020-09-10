import React, { useState } from 'react';
import {
  IconButton,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Autocomplete } from '@material-ui/lab';
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
    name: 'Adresse',
    selector: 'address',
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
    lastname: 'benzamia',
    firstname: 'rabie',
    tel: '0771700803',
    email: 'rbenzamia@gmail.com',
    address: 'chlef',
  },
];
const roles = [
  {
    id: 'manager',
    name: 'Manager',
  },
  {
    id: 'caissier',
    name: 'Caissier',
  },
  {
    id: 'stock',
    name: 'Responsable de stock',
  },
];
export default function Employee(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [employeeParams, setEmployeeParams] = useState<{
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
    address: string;
    salaire: number;
    isUser: boolean;
    user?: { username: string; password: string; role: string };
  }>();
  const [isChecked, setisChecked] = useState(false);
  const handleChecked = () => {
    setisChecked(!isChecked);
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Employée"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Employée"
      >
        <Grid container spacing={2} className="mb-2">
          <Grid item xs>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              onChange={
                (e) =>
                  setEmployeeParams({
                    ...employeeParams,
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
                  setEmployeeParams({
                    ...employeeParams,
                    firstname: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-2">
          <Grid item xs>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Téléphone"
              variant="outlined"
              onChange={
                (e) =>
                  setEmployeeParams({
                    ...employeeParams,
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
                  setEmployeeParams({
                    ...employeeParams,
                    email: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
        </Grid>
        <TextField
          className="mb-3"
          fullWidth
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          onChange={
            (e) =>
              setEmployeeParams({
                ...employeeParams,
                address: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <FormControl required style={{ width: '100%' }} variant="outlined">
          <InputLabel>Salaire</InputLabel>
          <OutlinedInput
            type="number"
            onChange={
              (e) =>
                setEmployeeParams({
                  ...employeeParams,
                  salaire: parseFloat(e.target.value),
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            endAdornment={<InputAdornment position="end">DA</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChecked} />}
          label="Ajouter comme utilisateur"
          className="m-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmployeeParams({
              ...employeeParams,
              isUser: e.target.checked,
            });
          }}
        />

        {isChecked ? (
          <>
            <TextField
              className="mb-3"
              required
              style={{ width: '100%' }}
              id="outlined-basic"
              label="Nom d'utilisateur"
              variant="outlined"
              onChange={
                (e) =>
                  setEmployeeParams({
                    ...employeeParams,
                    user: {
                      ...employeeParams?.user,
                      username: e.target.value,
                    },
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
            <TextField
              required
              style={{ width: '100%' }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={
                (e) =>
                  setEmployeeParams({
                    ...employeeParams,
                    user: {
                      ...employeeParams?.user,
                      password: e.target.value,
                    },
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
            <Autocomplete
              className="my-3"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(_event: any, newValue: any | null) => {
                setEmployeeParams({
                  ...employeeParams,
                  user: {
                    ...employeeParams?.user,
                    role: newValue.id,
                  },
                });
              }}
              options={roles}
              getOptionLabel={(option) => option.name}
              style={{ width: '100%' }}
              renderInput={(params) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TextField
                  required
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="role"
                  variant="outlined"
                />
              )}
            />
          </>
        ) : (
          ''
        )}
      </SimpleModal>
    </div>
  );
}
