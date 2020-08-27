import React, { useState, useEffect } from 'react';
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
import staticService from '../../../../services/statics.service';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

// const data = [
//   {
//     id: 'Pizza Viande',
//     famille: 'Pizza',
//     prix: '300 DA',
//     Quantité: '200',
//   },
//   {
//     id: 'Pizza Poulet',
//     famille: 'Pizza',
//     prix: '300 DA',
//     Quantité: '200',
//   },
//   {
//     id: 'Sandwich Viande',
//     famille: 'Sandwich',
//     prix: '200 DA',
//     Quantité: '150',
//   },
// ];

const columns = [
  {
    name: 'Produit',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Famille',
    selector: 'familyId',
    sortable: true,
  },
  {
    name: 'Quantité',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Prix TTC',
    selector: 'priceTTC',
    sortable: true,
  },
  {
    name: 'TVA',
    selector: 'tva',
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
const Famille = ['Pizza', 'Sandwich', 'Tacos', 'Plat'];
const AddtextField = ({
  onChange,
  idx,
}: {
  idx: number;
  onChange: (index: number, name: string, q: number) => void;
}) => {
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setquantity] = useState(0);
  const handleChange = (name: string, qt: number) => {
    onChange(idx, name, qt);
  };
  return (
    <div className={useStyles().root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Autocomplete
            options={ingredient}
            getOptionLabel={(option) => option.title}
            style={{ width: '100%' }}
            onChange={(_event: any, newValue: any | null) => {
              setIngredientName(newValue.title);
              handleChange(newValue.title, quantity);
              console.log(newValue.title);
            }}
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="ingredient" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs>
          <FormControl style={{ width: '100%' }}>
            <Input
              type="number"
              id="standard-adornment-quantity"
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby="standard-quantity-helper-text"
              inputProps={{
                'aria-label': 'quantity',
              }}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setquantity(val);
                handleChange(ingredientName, val);
              }}
            />
            <FormHelperText id="standard-quantity-helper-text">
              quantity
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
export default function ListeProduit(): JSX.Element {
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      tva: number;
      priceTTC: number;
      isComposed: boolean;
      familyId: string;
    }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [fieldsNum, setFieldNum] = useState(1);
  const [ingredients, setIngredients] = useState<
    {
      index: number;
      ingredientName: string;
      quantity: number;
    }[]
  >([{ index: 0, ingredientName: '', quantity: null }]);
  const [productParams, setProductParams] = useState<{
    name: string;
    priceTTC: number;
    tva: number;
    ingredients?: { stockableId: string; quantity: number }[];
    stockableId: string;
    isComposed: boolean;
    familyId: string;
  }>();
  useEffect(() => {
    staticService
      .getProducts()
      .then((d) => {
        return setData(
          d.map((p) => ({
            id: p.id,
            name: p.name,
            tva: p.tva,
            priceTTC: p.priceTTC,
            familyId: p.familyId,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleIngredients = (
    index: number,
    ingredientName: string,
    quantity: number
  ) => {
    setIngredients(
      ingredients.map((ing, i) => {
        if (index === i) {
          console.log('is true');
          return { index: i, ingredientName, quantity };
        }
        return ing;
      })
    );
  };
  const handleAddField = () => {
    const index = fieldsNum;
    setFieldNum(index + 1);
    setIngredients(
      ingredients.concat([{ index, ingredientName: '', quantity: null }])
    );
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
        onSubmit={() => console.log('submitted', ingredients)}
      >
        <div className={useStyles().root}>
          <Grid container spacing={2} className="my-2">
            <Grid item xs>
              <TextField
                style={{ width: '100%' }}
                id="outlined-basic"
                label="Nom de Produit"
                variant="outlined"
                onChange={
                  (e) =>
                    setProductParams({
                      ...productParams,
                      name: e.target.value,
                    })
                  // a
                }
              />
            </Grid>
            <Grid item xs>
              <FormControl style={{ width: '100%' }} variant="outlined">
                <InputLabel>Amount</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={
                    (e) =>
                      setProductParams({
                        ...productParams,
                        priceTTC: parseFloat(e.target.value),
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
          </Grid>
        </div>
        <Autocomplete
          onChange={(_event: any, newValue: any | null) => {
            setProductParams({ ...productParams, familyId: newValue.id });
          }}
          options={Famille}
          getOptionLabel={(option) => option}
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
              <AddtextField
                key={index}
                idx={index}
                onChange={handleIngredients}
              />
            ))}
          </>
        ) : (
          ''
        )}
      </SimpleModal>
    </div>
  );
}
