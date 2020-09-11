import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IconButton, TextField, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import userService from '../../../../services/user.service';
import grhService from '../../../../services/grh.service';

const columns = [
  {
    name: 'Utilisateur',
    selector: 'username',
    sortable: true,
  },
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
    name: 'Roles',
    selector: 'roles',
    format: (row) => {
      const rolesString: string = row.roles.reduce((acc, val) => {
        return `${acc + val.name}, `;
      }, '');

      return rolesString.slice(0, rolesString.length - 2);
    },
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
//     username: 'rabieù971',
//     lastname: 'benz',
//     firstname: 'rabie',
//     name: 'manager',
//   },
// ];
// const employees = [
//   {
//     id: '333',
//     name: 'yasser',
//   },
//   {
//     id: '3334',
//     name: 'rabie',
//   },
// ];
// const roles = [
//   {
//     id: 'caissier',
//     name: 'caissier',
//   },
//   {
//     id: 'manager',
//     name: 'manager',
//   },
// ];
export default function Users(): JSX.Element {
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

  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [userParams, setUserParams] = useState<{
    username: string;
    password: string;
    employeeId: string;
    roles: Array<string>;
  }>();
  const [data, setData] = useState<
    {
      firstname: string;
      lastname: string;
      username: string;
      roles: Array<{ id: string; name: string }>;
    }[]
  >([]);
  const [employees, setEmployees] = useState<
    {
      id: string;
      firstname: string;
      lastname: string;
    }[]
  >([]);
  useEffect(() => {
    grhService
      .getEmployees()
      .then((em) => {
        return setEmployees(
          em.map((e) => ({
            id: e.id,
            firstname: e.firstName,
            lastname: e.lastName,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const dataLoader = () => {
    userService
      .getUsers()
      .then((u) => {
        return setData(
          u.map((p) => ({
            firstname: p.employee?.firstName,
            lastname: p.employee?.lastName,
            username: p.userName,
            roles: p.roles,
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userService
      .createUser(
        userParams.employeeId,
        userParams.username,
        userParams.password,
        userParams.roles
      )
      .then((ok) => {
        if (ok) {
          setOpen(true);
          setModalVisible(false);
          dataLoader();
          console.log('user added ', ok);
        } else console.log('user not created');
        return true;
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Utilisateur"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          utilisateur ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Utilisateur"
        onSubmit={handleCreate}
      >
        <TextField
          className="mb-3"
          required
          fullWidth
          id="outlined-basic"
          label="Nom d'utilisateur "
          variant="outlined"
          onChange={
            (e) =>
              setUserParams({
                ...userParams,
                username: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <TextField
          className="mb-3"
          required
          fullWidth
          id="outlined-basic"
          label="Mot de passe"
          type="password"
          variant="outlined"
          onChange={
            (e) =>
              setUserParams({
                ...userParams,
                password: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <Autocomplete
          className="mb-3"
          onChange={(_event: any, newValue: any | null) => {
            setUserParams({
              ...userParams,
              employeeId: newValue ? newValue.id : null,
            });
          }}
          options={employees}
          getOptionLabel={(option) => option.firstname}
          style={{ width: '100%' }}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              required
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Employee"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          onChange={(_event: any, newValue: any | null) => {
            setUserParams({
              ...userParams,
              roles: [newValue.id],
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
              label="Role"
              variant="outlined"
            />
          )}
        />
      </SimpleModal>
    </div>
  );
}
