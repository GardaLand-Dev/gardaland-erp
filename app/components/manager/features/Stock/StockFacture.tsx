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
    selector: 'supplier',
    format: (row) => row?.supplier?.name,
    sortable: true,
  },
  {
    name: 'Status de Paiement',
    selector: 'isPaid',
    sortable: true,
    format: (row) => {
      if (row.isPaid) return 'Payée';
      if (new Date(row.dueDate) > new Date()) return 'Non Payée';
      return 'En Retard';
    },
    conditionalCellStyles: [
      {
        when: (row) => row.isPaid,
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
        },
      },
      {
        when: (row) => !row.isPaid && new Date(row.dueDate) > new Date(),
        // non payée
        style: {
          backgroundColor: 'rgba(63, 195, 5, 0.9)',
          color: 'white',
        },
      },
      {
        when: (row) => !row.isPaid && new Date(row.dueDate) <= new Date(),
        // en retard
        style: {
          backgroundColor: 'rgba(63, 195, 1, 0.9)',
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
    selector: 'dueDate',
    sortable: true,
  },
];
// const data = [
//   {
//     name: 'Sliman',
//     isPaid: 'Payé',
//     amount: '300000.00 DA',
//     createdAt: '01/09/2020',
//   },
// ];
// const suppliers = [
//   {
//     id: 'sliman',
//     name: 'Sliman',
//   },
//   {
//     id: 'azzouz',
//     name: 'Azzouz',
//   },
// ];

export default function StockFacture(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [suppliers, setSuppliers] = useState<
    {
      id: string;
      name: string;
      tel: string;
      adresse: string;
    }[]
  >([]);
  useEffect(() => {
    inventoryService
      .getSuppliers(true)
      .then((d) => setSuppliers(d))
      .catch(console.error);
  }, []);
  const [data, setData] = useState<
    {
      id: string;
      dueDate: Date;
      amount: number;
      isPaid: boolean;
      note: string;
      createdAt: Date;
      updatedAt: Date;
      supplierId: string;
      createdBy: string;
      supplier?: { id: string; name: string; tel: string; address: string };
    }[]
  >([]);
  const dataLoader = () => {
    inventoryService.getInvoices(true).then(setData).catch(console.error);
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const now = new Date();
  const [factureParams, setFactureParams] = useState<{
    supplierId?: string;
    isPaid: boolean;
    deliveredOn?: Date;
    dueDate: Date;
    note?: string;
    stockItems?: {
      invItemId: string;
      quantity: number;
      cost: number;
    }[];
  }>({
    isPaid: false,
    deliveredOn: new Date(),
    dueDate: new Date(now.setDate(now.getDate() + 7)),
  });
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
      stockItems: factureParams.stockItems?.filter((i) => i.invItemId !== id),
    });
    setStockables(
      stockables.map((s) => {
        if (s.id === id) return { ...s, selected: false };
        return s;
      })
    );
  };

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedDueDate, setSelectedDueDate] = useState(
  //   new Date(now.setDate(now.getDate() + 7))
  // );
  // const [isChecked, setisChecked] = useState(false);

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
          setStockables(stockables.map((s) => ({ ...s, selected: false })));
          setFactureParams({
            isPaid: false,
            deliveredOn: new Date(),
            dueDate: new Date(now.setDate(now.getDate() + 7)),
          });
        }}
        visible={modalVisible}
        title="Ajouter Facture"
        onSubmit={(e) => {
          e.preventDefault();
          inventoryService
            .createSupply(
              factureParams.supplierId,
              factureParams.dueDate,
              factureParams.deliveredOn,
              factureParams.stockItems,
              factureParams.note,
              factureParams.isPaid
            )
            .then((ok) => {
              if (!ok) throw new Error('cant create supply');
              console.log('created successfully');
              dataLoader();
              setModalVisible(false);
              setFactureParams({
                isPaid: false,
                deliveredOn: new Date(),
                dueDate: new Date(now.setDate(now.getDate() + 7)),
              });
              return true;
            })
            .catch(console.error);
        }}
      >
        <Autocomplete
          className="my-3"
          onChange={(_event: any, newValue: any | null) => {
            setFactureParams({
              ...factureParams,
              supplierId: newValue ? newValue.id : null,
            });
          }}
          options={suppliers}
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
                value={factureParams.deliveredOn || new Date()}
                onChange={(date: moment.Moment) => {
                  setFactureParams({
                    ...factureParams,
                    deliveredOn: date.toDate(),
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
                  checked={factureParams.isPaid}
                  // onChange={() => setisChecked(!isChecked)}
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
        {!factureParams.isPaid ? (
          <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className="ml-3"
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                id="date-picker-inline"
                label="Date d'échéance"
                value={factureParams.dueDate}
                onChange={(date: moment.Moment) => {
                  setFactureParams({
                    ...factureParams,
                    dueDate: date.toDate(),
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
              stockItems: factureParams?.stockItems
                ? [
                    ...factureParams?.stockItems,
                    {
                      invItemId: newValue?.id,
                      cost: newValue?.cost,
                      quantity: newValue?.quantity,
                    },
                  ]
                : [
                    {
                      invItemId: newValue?.id,
                      cost: newValue?.cost,
                      quantity: newValue?.quantity,
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
            {factureParams?.stockItems?.map((s) => {
              const { name, unit } = stockables.find(
                (ss) => ss.id === s.invItemId
              );
              return (
                <tr key={s.invItemId}>
                  <td>{name}</td>
                  <td>
                    <FormControl style={{ width: 100 }}>
                      <Input
                        type="number"
                        id="standard-adornment-quantity"
                        endAdornment={
                          // eslint-disable-next-line react/jsx-wrap-multilines
                          <InputAdornment position="end">{unit}</InputAdornment>
                        }
                        inputProps={{
                          'aria-label': 'quantity',
                        }}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setFactureParams({
                            ...factureParams,
                            stockItems: factureParams.stockItems.map((ss) => {
                              if (ss.invItemId === s.invItemId)
                                return { ...ss, quantity: val };
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
                              if (ss.invItemId === s.invItemId)
                                return { ...ss, cost: val };
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
                        handleDelete(s.invItemId);
                      }}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SimpleModal>
    </div>
  );
}
