import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CustomTable from '../../CustomTable';
import SimpleModal from '../../SimpleModal';
import staticService from '../../../../services/statics.service';

const columns = [
  {
    name: 'Emplacement',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Imprimante',
    selector: 'printer',
    sortable: true,
  },
];

// const printers = ['Pizza Printer', 'Sandwich Printer'];
export default function Station(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [stationName, setStationName] = useState('');
  const [printerName, setPrinterName] = useState<string | null>();
  const [data, setData] = useState<
    { id: string; name: string; printer: string }[]
  >([]);
  const [printers, setPrinters] = useState<{ name: string; status: any[] }[]>(
    []
  );
  const loadPrinters = () => {
    staticService
      .getPrinters()
      .then((d) => {
        console.log(d);
        return setPrinters(d);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    staticService
      .getStations()
      .then((d) => {
        return setData(
          d.map((s) => ({ id: s.id, name: s.name, printer: s.printer }))
        );
      })
      .catch((err) => console.log(err));
    loadPrinters();
  }, []);
  const handleAddClicked = () => {
    setModalVisible(true);
  };
  const handleStationValue = (e) => {
    setStationName(e.target.value);
  };
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    staticService
      .createStation(stationName, printerName)
      .then((ok) => console.log('Station Added ', ok))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="Emplacement"
        onAddClicked={handleAddClicked}
      />
      <SimpleModal
        onClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        title="Ajouter Emplacement"
        onSubmit={handleCreate}
      >
        <TextField
          className="my-3"
          style={{ width: '100%' }}
          label="Nom de Emplacement"
          variant="outlined"
          onChange={handleStationValue}
        />
        <Autocomplete
          onChange={(
            _event: any,
            newValue: { name: string; status: any[] }
          ) => {
            setPrinterName(newValue.name);
            console.log(newValue);
          }}
          options={printers}
          getOptionLabel={(op) => op.name}
          style={{ width: '100%' }}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="printer" variant="outlined" />
          )}
        />
      </SimpleModal>
    </div>
  );
}
