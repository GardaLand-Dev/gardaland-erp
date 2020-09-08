import React, { useState, useEffect } from 'react';
import { IconButton, TextField, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
import staticService from '../../../../services/statics.service';

const columns = [
  {
    name: 'famille',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'emplacement',
    selector: 'stationName',
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
//     id: 'Pizza',
//     emplacement: 'Pizza Printer',
//   },
//   {
//     id: 'Sandwich',
//     emplacement: 'Sandwich printer',
//   },
//   {
//     id: 'Tacos',
//     emplacement: 'Tacos Printer',
//   },
// ];
// const Emplacement = [
//   {
//     id: 'printer_1',
//     name: 'Pizza Printer',
//   },
//   {
//     id: 'printer_2',
//     name: 'Sandwich Printer',
//   },
//   {
//     id: 'printer_3',
//     name: 'Tacos Printer',
//   },
// ];
export default function FamilleList(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [value, setValue] = useState<string | null>();
  const [data, setData] = useState<
    { id: string; name: string; stationId: string }[]
  >([]);
  const [station, setStation] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    staticService
      .getStations()
      .then((d) => {
        return setStation(d.map((s) => ({ id: s.id, name: s.name })));
      })
      .catch((err) => console.log(err));
  }, []);
  const dataLoader = () => {
    staticService
      .getFamilies(true, true)
      .then((d) => {
        return setData(
          d.map((f) => ({
            id: f.id,
            name: f.name,
            stationId: f.stationId,
            stationName: f.station?.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const handleFamilyName = (e) => {
    setFamilyName(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    staticService
      .createFamily(familyName, value)
      .then((ok) => {
        if (ok) {
          setOpen(true);
          setModalVisible(false);
          dataLoader();
          console.log('familly added ', ok);
        } else console.log('family not created');
        return true;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="liste des familles"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Article ajouté avec succès
        </Alert>
      </Snackbar>
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
          onChange={handleFamilyName}
        />
        <Autocomplete
          onChange={(
            _event: any,
            newValue: { id: string; name: string } | null
          ) => {
            setValue(newValue.id);
            console.log(newValue.id);
          }}
          options={station}
          getOptionLabel={(option) => option.name}
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
