import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
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
    name: 'Fournisseur',
    selector: 'fname',
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
    note: 'friteuse',
    amount: '3000000 DA',
    fname: 'zanouli prod',
    createdAt: '09/09/2020',
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
export default function Facture(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const [factureAchat, setFactureAchat] = useState<{
    note: string;
    fournisseur: string;
    amount: number;
    createdAt: Date;
    items?: {
      itemName: string;
      quantity: number;
      price: number;
    }[];
  }>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Factures d'achat"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Facture d'achat"
      >
        <Autocomplete
          className="my-3"
          onChange={(_event: any, newValue: any | null) => {
            setFactureAchat({
              ...factureAchat,
              fournisseur: newValue ? newValue.id : null,
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
              setFactureAchat({
                ...factureAchat,
                note: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
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
              setFactureAchat({
                ...factureAchat,
                createdAt: date,
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </SimpleModal>
    </div>
  );
}
