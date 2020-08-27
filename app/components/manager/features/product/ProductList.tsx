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
import stockSerivce from '../../../../services/stock.service';
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
// const ingredient = [
//   { title: 'Viande' },
//   { title: 'Poulet' },
//   { title: 'escalope' },
//   { title: 'merguez' },
// ];
// const Famille = ['Pizza', 'Sandwich', 'Tacos', 'Plat'];
const AddtextField = ({
  onChange,
  data,
}: {
  data: {
    id: string;
    name: string;
    selected: boolean;
    unit: string;
    quantity: number;
  }[];
  onChange: (id: string, quantity: number, prevId: string) => void;
}) => {
  const [ingredientId, setIngredientId] = useState('');
  const [quantity, setquantity] = useState(0);
  // const [ingredient, setIngredient] = useState<
  //   { id: string; name: string; unit: string; selected: boolean }[]
  // >([]);
  const handleChange = (id: string, qt: number) => {
    onChange(id, qt, ingredientId);
  };
  return (
    <div className={useStyles().root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Autocomplete
            options={data.filter((i) => !i.selected)}
            getOptionLabel={(option) => option.name}
            style={{ width: '100%' }}
            onChange={(_event: any, newValue: any | null) => {
              const Value = newValue ? newValue.id : null;
              handleChange(Value, quantity);
              setIngredientId(Value);
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
                handleChange(ingredientId, val);
                setquantity(val);
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
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [fieldsNum, setFieldNum] = useState(1);
  const [famille, setFamille] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    staticService
      .getFamilies()
      .then((d) => {
        return setFamille(d.map((p) => ({ id: p.id, name: p.name })));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const [ingredients, setIngredients] = useState<
    {
      id: string;
      name: string;
      quantity: number;
      unit: string;
      selected: boolean;
    }[]
  >([]);
  useEffect(() => {
    stockSerivce
      .getStockables(true)
      .then((d) => {
        return setIngredients(
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

  const [productParams, setProductParams] = useState<{
    name: string;
    priceTTC: number;
    tva: number;
    ingredients?: { stockableId: string; quantity: number }[];
    stockableId?: string;
    isComposed: boolean;
    familyId: string;
  }>();

  const handleIngredients = (id: string, quantity: number, prevId: string) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, quantity, selected: true };
        }
        if (ing.id === prevId) return { ...ing, selected: false };
        return ing;
      })
    );
  };

  const handleAddField = () => {
    // const index = fieldsNum;
    setFieldNum(fieldsNum + 1);
    // setIngredients(
    //   ingredients.concat([{ index, ingredientName: '', quantity: null }])
    // );
  };
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const handleChecked = () => {
    setisChecked(!isChecked);
  };
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    staticService
      .createProduct(
        productParams.name,
        productParams.priceTTC,
        productParams.tva,
        ingredients
          .filter((i) => i.selected)
          .map((i) => ({ id: i.id, quantity: i.quantity })),
        isChecked,
        productParams.stockableId,
        productParams.familyId
      )
      // eslint-disable-next-line no-console
      .then((ok) => console.log('familly added ', ok))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
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
        onSubmit={handleCreate}
      >
        <div className={useStyles().root}>
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
          <Grid container spacing={2} className="my-2">
            <Grid item xs>
              <FormControl style={{ width: '100%' }} variant="outlined">
                <InputLabel>TVA</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={
                    (e) =>
                      setProductParams({
                        ...productParams,
                        tva: parseFloat(e.target.value),
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
              <FormControl style={{ width: '100%' }} variant="outlined">
                <InputLabel>TTC</InputLabel>
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
            setProductParams({
              ...productParams,
              familyId: newValue ? newValue.id : null,
            });
          }}
          options={famille}
          getOptionLabel={(option) => option.name}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProductParams({
              ...productParams,
              isComposed: e.target.checked,
            });
          }}
        />
        {isChecked ? (
          <>
            <IconButton color="primary" onClick={handleAddField}>
              <Add />
            </IconButton>
            {[...Array(fieldsNum).keys()].map((index) => (
              <AddtextField
                key={index}
                onChange={handleIngredients}
                data={ingredients}
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
