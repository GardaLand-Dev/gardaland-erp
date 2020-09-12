import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Snackbar,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Alert } from '@material-ui/lab';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
import financeService from '../../../../services/finance.service';

const columns = [
  {
    name: 'Note',
    selector: 'note',
    sortable: true,
  },
  {
    name: 'Montant',
    selector: 'amount',
    sortable: true,
  },
  {
    name: 'Date de creation',
    selector: 'createdAt',
    sortable: true,
  },
];
// const data = [
//   {
//     note: 'lkhobz',
//     amount: '200 DA',
//     createdAt: '04/09/2020',
//   },
// ];

export default function Expense(): JSX.Element {
  const [data, setData] = useState<
    {
      note: string;
      amount: number;
      createdAt: Date;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [expenseParams, setExpenseParams] = useState<{
    note?: string;
    amount?: number;
    createdAt: Date;
  }>({
    createdAt: new Date(),
  });
  const dataLoader = () => {
    financeService.getExpenses(true).then(setData).catch(console.error);
  };
  useEffect(() => {
    dataLoader();
  }, []);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    financeService
      .createExpense(
        expenseParams.note,
        expenseParams.amount,
        expenseParams.createdAt
      )
      .then((ok) => {
        if (ok) {
          setOpen(true);
          setModalVisible(false);
          dataLoader();
          console.log('expense added ', ok);
        } else console.log('expense not created');
        return true;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Dépense"
        onAddClicked={handleAddClicked}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Dépense ajouté avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Dépense"
        onSubmit={handleCreate}
      >
        <TextField
          className="mb-3"
          autoFocus
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Note"
          variant="outlined"
          required
          onChange={
            (e) =>
              setExpenseParams({
                ...expenseParams,
                note: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <Grid container spacing={2}>
          <Grid item xs>
            <FormControl required style={{ width: '100%' }} variant="outlined">
              <InputLabel>Montant</InputLabel>
              <OutlinedInput
                type="number"
                onChange={
                  (e) =>
                    setExpenseParams({
                      ...expenseParams,
                      amount: parseFloat(e.target.value),
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className="ml-3"
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                id="date-picker-inline"
                label="Date de creation"
                value={expenseParams.createdAt}
                onChange={(date: moment.Moment) => {
                  setExpenseParams({
                    ...expenseParams,
                    createdAt: date.toDate(),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </SimpleModal>
    </div>
  );
}
