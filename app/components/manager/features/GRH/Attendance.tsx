import React, { useEffect, useState } from 'react';
import { TextField, Grid, Snackbar } from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
import grhService from '../../../../services/grh.service';

const columns = [
  {
    name: 'Nom',
    selector: 'employee',
    format: (row) => row?.employee?.lastName,
    sortable: true,
  },
  {
    name: 'Prénom',
    selector: 'employee',
    format: (row) => row?.employee?.firstName,
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'dayDate',
    sortable: true,
  },
  {
    name: 'Enregistrement',
    selector: 'checkIn',
    sortable: true,
  },
  {
    name: 'Check-out',
    selector: 'checkOut',
    sortable: true,
  },
  {
    name: 'Statut',
    selector: 'statut',
    conditionalCellStyles: [
      {
        when: (row) => row.statut === 'présent',
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      },
      {
        when: (row) => row.statut === 'En retard',
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      },
    ],
    sortable: true,
  },
];
// const data = [
//   {
//     lastname: 'benz',
//     firstname: 'rabie',
//     dayDate: '09/09/2020',
//     checkIn: '08:00',
//     checkOut: '16:00',
//     statut: 'présent',
//   },
//   {
//     lastname: 'benz',
//     firstname: 'rabie',
//     dayDate: '09/09/2020',
//     checkIn: '08:00',
//     checkOut: '16:00',
//     statut: 'En retard',
//   },
// ];
// const employees = [
//   {
//     id: '333',
//     name: 'BENZ',
//   },
//   {
//     id: '334',
//     name: 'rabie',
//   },
// ];
export default function Attendace(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
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
          em.map((p) => ({
            id: p.id,
            firstname: p.firstName,
            lastname: p.lastName,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const [attendanceParams, setAttendanceParams] = useState<{
    employeeId?: string;
    dayDate: Date;
    checkIn: Date;
    checkOut: Date;
  }>({ checkIn: new Date(), checkOut: new Date(), dayDate: new Date() });
  const [data, setData] = useState<
    {
      employee?: { id: string; firstname: string; lastname: string };
      dayDate: Date;
      checkIn: Date;
      checkOut: Date;
    }[]
  >([]);
  const dataLoader = () => {
    grhService.getAttendances(true).then(setData).catch(console.error);
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
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="La présence"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Facture ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Présence"
        onSubmit={(e) => {
          e.preventDefault();
          grhService
            .createAttendance(
              attendanceParams.employeeId,
              attendanceParams.dayDate,
              attendanceParams.checkIn,
              attendanceParams.checkOut
            )
            .then((ok) => {
              if (!ok) throw new Error('cant create supply');
              console.log('created successfully');
              dataLoader();
              setOpen(true);
              setModalVisible(false);
              return true;
            })
            .catch(console.error);
        }}
      >
        <Autocomplete
          className="mb-3"
          onChange={(_event: any, newValue: any | null) => {
            setAttendanceParams({
              ...attendanceParams,
              employeeId: newValue ? newValue.id : null,
            });
          }}
          options={employees}
          getOptionLabel={(option) => option.lastname}
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container spacing={2}>
            <Grid item xs>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                id="date-picker-inline"
                label="Date"
                value={attendanceParams.dayDate}
                onChange={(date: moment.Moment) => {
                  setAttendanceParams({
                    ...attendanceParams,
                    dayDate: date.toDate(),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs>
              <KeyboardTimePicker
                id="time-picker"
                label="Enregistrement"
                value={attendanceParams.checkIn}
                onChange={(date: moment.Moment) => {
                  setAttendanceParams({
                    ...attendanceParams,
                    checkIn: date.toDate(),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
            <Grid item xs>
              <KeyboardTimePicker
                id="time-picker"
                label="Check-Out"
                value={attendanceParams.checkOut}
                onChange={(date: moment.Moment) => {
                  setAttendanceParams({
                    ...attendanceParams,
                    checkOut: date.toDate(),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </SimpleModal>
    </div>
  );
}
