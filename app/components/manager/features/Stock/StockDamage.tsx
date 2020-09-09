import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Autocomplete } from '@material-ui/lab';
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
  const [stockDamage, setStockDamage] = useState<
    {
      id: string;
      quantity: number;
      note: string;
    }[]
  >([]);
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
        {/* <Autocomplete
          className="mb-4"
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(_event: any, newValue: any | null) => {

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
        /> */}
      </SimpleModal>
    </div>
  );
}
