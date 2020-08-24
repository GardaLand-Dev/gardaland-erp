import React, { useState } from 'react';
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  TextField,
  Checkbox,
  Input,
  FormHelperText,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Add from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const data = [
  {
    id: 'Pizza Viande',
    famille: 'Pizza',
    prix: '300 DA',
    Quantité: '200',
  },
  {
    id: 'Pizza Poulet',
    famille: 'Pizza',
    prix: '300 DA',
    Quantité: '200',
  },
  {
    id: 'Sandwich Viande',
    famille: 'Sandwich',
    prix: '200 DA',
    Quantité: '150',
  },
];

const columns = [
  {
    name: 'Produit',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Famille',
    selector: 'famille',
    sortable: true,
  },
  {
    name: 'Prix',
    selector: 'prix',
    sortable: true,
  },
  {
    name: 'Quantité',
    selector: 'Quantité',
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
const ingredient = [
  { title: 'Viande' },
  { title: 'Poulet' },
  { title: 'escalope' },
  { title: 'merguez' },
];
const Famille = [
  { title: 'Pizza' },
  { title: 'Sandwich' },
  { title: 'Tacos' },
  { title: 'Plat' },
];
const AddtextField = () => (
  <>
    <div className={useStyles().root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Autocomplete
            options={ingredient}
            getOptionLabel={(option) => option.title}
            style={{ width: '100%' }}
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="ingredient" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs>
          <FormControl style={{ width: '100%' }}>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="standard-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  </>
);
export default function ListeProduit(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [fieldsNum, setFieldNum] = useState(1);
  const handleAddField = () => {
    setFieldNum(fieldsNum + 1);
  };
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const handleChecked = () => {
    setisChecked(!isChecked);
    // eslint-disable-next-line no-console
    console.log(isChecked);
  };
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="liste des produits"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
          setisChecked(false);
          setFieldNum(1);
        }}
        visible={modalVisible}
        title="Ajouter Produit"
      >
        <form>
          <div className={useStyles().root}>
            <Grid container spacing={2} className="my-2">
              <Grid item xs>
                <TextField
                  style={{ width: '100%' }}
                  id="outlined-basic"
                  label="Nom de Produit"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <FormControl style={{ width: '100%' }} variant="outlined">
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <Autocomplete
            options={Famille}
            getOptionLabel={(option) => option.title}
            style={{ width: '100%' }}
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="famille" variant="outlined" />
            )}
          />
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChecked} />}
            label="isComposed"
            className="m-2"
          />
          {isChecked ? (
            <>
              <IconButton color="primary" onClick={handleAddField}>
                <Add />
              </IconButton>
              {[...Array(fieldsNum).keys()].map((index) => (
                <AddtextField key={index} />
              ))}
            </>
          ) : (
            ''
          )}
        </form>
      </SimpleModal>
    </div>
  );
}
