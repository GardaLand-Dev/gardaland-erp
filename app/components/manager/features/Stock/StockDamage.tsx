import React, { useState, useEffect } from 'react';
import {
  IconButton,
  TextField,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Grid,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Autocomplete } from '@material-ui/lab';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import inventoryService from '../../../../services/inventory.service';

const columns = [
  {
    name: 'Article',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Quantité',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Note',
    selector: 'note',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'createdAt',
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
    name: 'Viande',
    quantity: '1000g',
    note: 'probleme electricité',
    createdAt: '05/09/2020',
  },
];
export default function StockDamage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [stockables, setStockables] = useState<
    {
      id: string;
      name: string;
      unit: string;
    }[]
  >([]);
  useEffect(() => {
    inventoryService
      .getInvItems(true)
      .then((d) => {
        return setStockables(
          d.map((i) => ({
            id: i.id,
            name: i.name,
            unit: i.unit,
          }))
        );
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);
  const [stockDamage, setStockDamage] = useState<{
    id?: string;
    quantity?: number;
    note?: string;
    createdAt: Date;
  }>({ createdAt: new Date() });
  const [unitField, setUnitField] = useState('');
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Stock Endommagé"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter artcile endommagé"
      >
        <Autocomplete
          className="mb-2"
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(_event: any, newValue: any | null) => {
            setStockDamage({
              ...stockDamage,
              id: newValue ? newValue.id : null,
            });
            setUnitField(newValue.unit);
          }}
          options={stockables}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="stockable"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs>
            <FormControl required style={{ width: '100%' }} variant="outlined">
              <InputLabel>Quantité</InputLabel>
              <OutlinedInput
                type="number"
                onChange={
                  (e) =>
                    setStockDamage({
                      ...stockDamage,
                      quantity: parseFloat(e.target.value),
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                endAdornment={
                  <InputAdornment position="end">{unitField}</InputAdornment>
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
                value={stockDamage.createdAt}
                onChange={(date: moment.Moment) => {
                  setStockDamage({
                    ...stockDamage,
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
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Note"
          variant="outlined"
          onChange={(e) => {
            setStockDamage({
              ...stockDamage,
              note: e.target.value,
            });
          }}
        />
      </SimpleModal>
    </div>
  );
}
