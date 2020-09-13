import React, { useEffect, useState } from 'react';
import { Alert, Autocomplete } from '@material-ui/lab';
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
import inventoryService from '../../../../services/inventory.service';
import financeService from '../../../../services/finance.service';

const columns = [
  {
    name: 'Note',
    selector: 'note',
    sortable: true,
  },
  {
    name: 'Fournisseur',
    selector: 'supplier',
    format: (row) => row?.supplier?.name,
    sortable: true,
  },
  {
    name: 'Montant',
    selector: 'amount',
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
          backgroundColor: 'rgba(212, 209, 1)',
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
    name: 'Date de creation',
    selector: 'createdAt',
    sortable: true,
  },
];
// const data = [
//   {
//     note: 'friteuse',
//     amount: '3000000 DA',
//     fname: 'zanouli prod',
//     createdAt: '09/09/2020',
//   },
// ];
// const fournisseurs = [
//   {
//     id: 'sliman',
//     name: 'Sliman',
//   },
//   {
//     id: 'azzouz',
//     name: 'Azzouz',
//   },
// ];
export default function Facture(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [suppliers, setSuppliers] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    inventoryService
      .getSuppliers(true)
      .then((d) => setSuppliers(d))
      .catch(console.error);
  }, []);
  const now = new Date();
  const [factureAchat, setFactureAchat] = useState<{
    supplierId?: string;
    note?: string;
    amount?: number;
    createdAt: Date;
    isPaid: boolean;
    dueDate: Date;
  }>({
    isPaid: false,
    createdAt: new Date(),
    dueDate: new Date(now.setDate(now.getDate() + 7)),
  });
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [data, setData] = useState<
    {
      note: string;
      amount: string;
      isPaid: boolean;
      createdAt: Date;
      supplier?: { id: string; name: string };
    }[]
  >([]);
  const dataLoader = () => {
    financeService.getInvoices(true).then(setData).catch(console.error);
  };
  useEffect(() => {
    dataLoader();
  }, []);
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Factures d'achat"
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
        title="Ajouter Facture d'achat"
        onSubmit={(e) => {
          e.preventDefault();
          financeService
            .createInvoice(
              factureAchat.supplierId,
              factureAchat.note,
              factureAchat.amount,
              factureAchat.createdAt,
              factureAchat.isPaid,
              factureAchat.dueDate
            )
            .then((ok) => {
              if (!ok) throw new Error('cant create supply');
              console.log('created successfully');
              dataLoader();
              setOpen(true);
              setModalVisible(false);
              setFactureAchat({
                isPaid: false,
                createdAt: new Date(),
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
            setFactureAchat({
              ...factureAchat,
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
        <TextField
          required
          className="mb-3"
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Note"
          variant="outlined"
          onChange={
            (e) =>
              setFactureAchat({
                ...factureAchat,
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
                    setFactureAchat({
                      ...factureAchat,
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
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox
                  checked={factureAchat.isPaid}
                  // onChange={() => setisChecked(!isChecked)}
                />
              }
              label="Est Payé"
              className="m-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFactureAchat({
                  ...factureAchat,
                  isPaid: e.target.checked,
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-3">
          <Grid item xs>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className="ml-3"
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                id="date-picker-inline"
                label="Date de creation"
                value={factureAchat.createdAt}
                onChange={(date: moment.Moment) => {
                  setFactureAchat({
                    ...factureAchat,
                    createdAt: date.toDate(),
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          {!factureAchat.isPaid ? (
            <Grid item xs>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  className="ml-3"
                  disableToolbar
                  variant="inline"
                  format="DD/MM/yyyy"
                  id="date-picker-inline"
                  label="Date d'échéance"
                  value={factureAchat.dueDate}
                  onChange={(date: moment.Moment) => {
                    setFactureAchat({
                      ...factureAchat,
                      dueDate: date.toDate(),
                    });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </SimpleModal>
    </div>
  );
}
