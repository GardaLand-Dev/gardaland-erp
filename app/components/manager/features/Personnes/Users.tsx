import React, { useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';

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
    name: 'Role',
    selector: 'name',
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
    username: 'rabieù971',
    lastname: 'benz',
    firstname: 'rabie',
    name: 'manager',
  },
];
const employees = [
  {
    id: '333',
    name: 'yasser',
  },
  {
    id: '3334',
    name: 'rabie',
  },
];
const roles = [
  {
    id: 'caissier',
    name: 'caissier',
  },
  {
    id: 'manager',
    name: 'manager',
  },
];
export default function Users(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [userParams, setUserParams] = useState<{
    username: string;
    password: string;
    employeeID: string;
    role: string;
  }>();
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Utilisateur"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Utilisateur"
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
              employeeID: newValue ? newValue.id : null,
            });
          }}
          options={employees}
          getOptionLabel={(option) => option.name}
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
              role: newValue ? newValue.id : null,
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
