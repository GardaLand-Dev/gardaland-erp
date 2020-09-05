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
  withStyles,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import SimpleModal from '../../SimpleModal';
import CustomTable from '../../CustomTable';
import stockSerivce from '../../../../services/stock.service';
import staticService from '../../../../services/statics.service';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#ffa076', // lkatba focused
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#ffbb9e', // bordure hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffa076', // bordure focused
      },
    },
  },
})(TextField);
const CssInputField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#ffa076',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#ffbb9e',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffa076',
      },
    },
  },
})(FormControl);

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
    selector: 'familyName',
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
  onDelete,
  data,
  fieldId,
}: {
  data: {
    id: string;
    name: string;
    selected: boolean;
    unit: string;
    quantity: number;
  }[];
  onChange: (id: string, quantity: number, prevId: string) => void;
  onDelete: (id: number) => void;
  fieldId: number;
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Autocomplete
          options={data.filter((i) => !i.selected)}
          getOptionLabel={(option) => option.name}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <FormControl style={{ width: 220 }}>
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
      <Grid item xs={1}>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => {
            onChange('', null, ingredientId);
            onDelete(fieldId);
          }}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
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
      familyName: string;
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
            familyName: p.family.name,
          }))
        );
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [fieldsId, setFieldId] = useState<
    {
      id: number;
    }[]
  >([{ id: 1 }]);
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
    setFieldId(
      fieldsId.concat([
        {
          id: fieldsId.length > 0 ? fieldsId[fieldsId.length - 1].id + 1 : 1,
        },
      ])
    );
    // setIngredients(
    //   ingredients.concat([{ index, ingredientName: '', quantity: null }])
    // );
  };
  const handleDeleteField = (id: number) => {
    setFieldId(fieldsId.filter((item) => item.id !== id));
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
          setFieldId([]);
          setIngredients([]);
        }}
        visible={modalVisible}
        title="Ajouter Produit"
        onSubmit={handleCreate}
      >
        <CssTextField
          autoFocus
          style={{ width: '100%' }}
          id="outlined-basic"
          label="Nom de Produit"
          variant="outlined"
          required
          onChange={
            (e) =>
              setProductParams({
                ...productParams,
                name: e.target.value,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <Grid container spacing={2} className="my-2">
          <Grid item xs>
            <CssInputField style={{ width: '100%' }} variant="outlined">
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
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                labelWidth={60}
              />
            </CssInputField>
          </Grid>
          <Grid item xs>
            <CssInputField
              required
              style={{ width: '100%' }}
              variant="outlined"
            >
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
            </CssInputField>
          </Grid>
        </Grid>

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
            <CssTextField
              required
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="famille"
              variant="outlined"
            />
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
            <IconButton color="primary" size="small" onClick={handleAddField}>
              <Add fontSize="large" />
            </IconButton>
            {fieldsId.map((index) => (
              <AddtextField
                fieldId={index.id}
                key={index.id}
                onChange={handleIngredients}
                data={ingredients}
                onDelete={handleDeleteField}
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
