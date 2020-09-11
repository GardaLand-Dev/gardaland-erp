import React, { useState, useEffect } from 'react';
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
  Snackbar,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Autocomplete, Alert } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import userService from '../../../../services/user.service';
import grhService from '../../../../services/grh.service';

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
// const data = [
//   {
//     lastname: 'benzamia',
//     firstname: 'rabie',
//     tel: '0771700803',
//     email: 'rbenzamia@gmail.com',
//     address: 'chlef',
//   },
// ];
// const roles = [
//   {
//     id: 'manager',
//     name: 'Manager',
//   },
//   {
//     id: 'caissier',
//     name: 'Caissier',
//   },
//   {
//     id: 'stock',
//     name: 'Responsable de stock',
//   },
// ];
export default function Employee(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
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
  const [roles, setRoles] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    userService
      .getRoles()
      .then((r) => {
        return setRoles(
          r.map((p) => ({
            id: p.id,
            name: p.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const [data, setData] = useState<
    {
      firstname: string;
      lastname: string;
      title: string;
      tel: string;
      email: string;
      address: string;
    }[]
  >([]);
  const [employeeParams, setEmployeeParams] = useState<{
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
    address: string;
    salaire: number;
    hourlyRate: number;
    title: string;
    isUser: boolean;
    user?: { username: string; password: string; roles: Array<string> };
  }>();
  const [isChecked, setisChecked] = useState(false);
  const handleChecked = () => {
    setisChecked(!isChecked);
  };
  const dataLoader = () => {
    grhService
      .getEmployees()
      .then((em) => {
        return setData(
          em.map((p) => ({
            firstname: p.firstName,
            lastname: p.lastName,
            title: p.title,
            address: p.address,
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
    grhService
      .createEmployee(
        employeeParams.firstname,
        employeeParams.lastname,
        employeeParams.title,
        employeeParams.address,
        employeeParams.email,
        employeeParams.tel,
        employeeParams.salaire,
        employeeParams.hourlyRate,
        employeeParams.user
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
        title="Employée"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Employee ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Employée"
        onSubmit={handleCreate}
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
        <Grid container spacing={2} className="mb-2">
          <Grid item xs>
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
                endAdornment={
                  <InputAdornment position="end">DA</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Taux horaire"
              variant="outlined"
              type="number"
              onChange={
                (e) =>
                  setEmployeeParams({
                    ...employeeParams,
                    hourlyRate: parseFloat(e.target.value),
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          id="outtlined-basic"
          label="Title"
          variant="outlined"
          onChange={
            (e) =>
              setEmployeeParams({
                ...employeeParams,
                title: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
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
              type="password"
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
                    roles: [newValue.id],
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
