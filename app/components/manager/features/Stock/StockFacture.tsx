import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  InputAdornment,
  FormControl,
  Input,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
    name: 'Fournisseur',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Status de Paiement',
    selector: 'isPaid',
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.isPaid === 'Payé',
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
        },
      },
    ],
  },
  {
    name: 'Somme',
    selector: 'amount',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
  },
];
const data = [
  {
    name: 'Sliman',
    isPaid: 'Payé',
    amount: '300000.00 DA',
    createdAt: '01/09/2020',
  },
];
const fournisseurs = [
  {
    id: 'sliman',
    name: 'Sliman',
  },
  {
    id: 'azzouz',
    name: 'Azzouz',
  },
];

export default function StockFacture(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [factureParams, setFactureParams] = useState<{
    fname?: string;
    isPaid?: boolean;
    createdAt?: Date;
    dueDate?: Date;
    stockItems?: {
      id: string;
      name: string;
      unit: string;
      quantity?: number;
      cost?: number;
    }[];
  }>({ stockItems: [] });
  const [stockables, setStockables] = useState<
    {
      id: string;
      name: string;
      unit: string;
      selected: boolean;
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
            selected: false,
          }))
        );
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);
  const HandleStockable = (id: string) => {
    setStockables(
      stockables.map((s) => {
        if (s.id === id) {
          return { ...s, selected: true };
        }
        return s;
      })
    );
  };
  const handleDelete = (id: string) => {
    setFactureParams({
      ...factureParams,
      stockItems: factureParams.stockItems?.filter((i) => i.id !== id),
    });
    setStockables(
      stockables.map((s) => {
        if (s.id === id) return { ...s, selected: false };
        return s;
      })
    );
  };
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDueDate, setSelectedDueDate] = useState(
    now.setDate(now.getDate() + 7)
  );
  const [isChecked, setisChecked] = useState(false);

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Factures"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Facture"
        onSubmit={(e) => e.preventDefault()}
      >
        <Autocomplete
          className="my-3"
          onChange={(_event: any, newValue: any | null) => {
            setFactureParams({
              ...factureParams,
              fname: newValue ? newValue.id : null,
            });
          }}
          options={fournisseurs}
          getOptionLabel={(option) => option.name}
          fullWidth
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              required
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Fournisseurs"
              variant="outlined"
            />
          )}
        />
        <Grid container spacing={2}>
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
                  setFactureParams({
                    ...factureParams,
                    createdAt: date,
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs>
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox
                  checked={isChecked}
                  onChange={() => setisChecked(!isChecked)}
                />
              }
              label="Est Payé"
              className="m-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFactureParams({
                  ...factureParams,
                  isPaid: e.target.checked,
                });
              }}
            />
          </Grid>
        </Grid>
        {!isChecked ? (
          <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className="ml-3"
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                id="date-picker-inline"
                label="Date d'échéance"
                value={selectedDueDate}
                onChange={(date: Date) => {
                  setSelectedDueDate(date);
                  console.log(date);
                  setFactureParams({
                    ...factureParams,
                    dueDate: date,
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </>
        ) : (
          ''
        )}

        <Autocomplete
          className="mb-4"
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(_event: any, newValue: any | null) => {
            HandleStockable(newValue.id);
            setFactureParams({
              ...factureParams,
              stockItems: [
                ...factureParams?.stockItems,
                {
                  id: newValue ? newValue.id : null,
                  name: newValue ? newValue.name : null,
                  unit: newValue ? newValue.unit : null,
                },
              ],
            });
          }}
          options={stockables.filter((i) => !i.selected)}
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Stockable</th>
              <th scope="col">Quantity</th>
              <th scope="col">Prix</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {factureParams?.stockItems.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <FormControl style={{ width: 100 }}>
                    <Input
                      type="number"
                      id="standard-adornment-quantity"
                      endAdornment={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <InputAdornment position="end">{s.unit}</InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'quantity',
                      }}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setFactureParams({
                          ...factureParams,
                          stockItems: factureParams.stockItems.map((ss) => {
                            if (ss.id === s.id) return { ...ss, quantity: val };
                            return ss;
                          }),
                        });
                      }}
                    />
                  </FormControl>
                </td>
                <td>
                  <FormControl style={{ width: 100 }}>
                    <Input
                      type="number"
                      id="standard-adornment-quantity"
                      endAdornment={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <InputAdornment position="end">DA</InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'prix',
                      }}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setFactureParams({
                          ...factureParams,
                          stockItems: factureParams.stockItems.map((ss) => {
                            if (ss.id === s.id) return { ...ss, cost: val };
                            return ss;
                          }),
                        });
                      }}
                    />
                  </FormControl>
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      handleDelete(s.id);
                    }}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleModal>
    </div>
  );
}
