import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';

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
const data = [
  {
    note: 'lkhobz',
    amount: '200 DA',
    createdAt: '04/09/2020',
  },
];

export default function Expense(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenseParams, setExpenseParams] = useState<{
    note: string;
    amount: number;
    createdAt: Date;
  }>();
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Dépense"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Dépense"
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
                value={selectedDate}
                onChange={(date: Date) => {
                  setSelectedDate(date);
                  setExpenseParams({
                    ...expenseParams,
                    createdAt: date,
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
