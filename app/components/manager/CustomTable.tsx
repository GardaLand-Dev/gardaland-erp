import React, { useState, useCallback } from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';

type Props = {
  data: Array<unknown>;
  columns: Array<IDataTableColumn>;
  title: string;
  clearSelectedRows: boolean;
  onAddClicked?: () => void;
  onDelete?: (selectedRows: any[]) => void;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const FilterComponent = ({
  filterText,
  onFilter,
  onClear,
}: {
  filterText: string | number | readonly string[];
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: React.MouseEventHandler;
}) => (
  <>
    <Paper component="form" className={useStyles().root}>
      <InputBase
        className={useStyles().input}
        id="search"
        type="text"
        placeholder="Filter By Name"
        value={filterText}
        onChange={onFilter}
      />
      <IconButton aria-label="search" className={useStyles().iconButton}>
        <SearchIcon />
      </IconButton>
      <Divider orientation="vertical" className={useStyles().divider} />
      <IconButton
        color="primary"
        aria-label="directions"
        className={useStyles().iconButton}
        onClick={onClear}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  </>
);

const CustomTable = ({
  data,
  columns,
  title,
  clearSelectedRows,
  onAddClicked,
  onDelete,
}: Props): JSX.Element => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const actions = (
    <IconButton
      color="primary"
      onClick={() => {
        onAddClicked();
      }}
    >
      <Add />
    </IconButton>
  );
  const filteredItems = data.filter((item) => {
    return columns
      .map((col) => col.selector)
      .reduce((acc, val: string) => {
        if (val && typeof item[val] === 'string') {
          const result = item[val]
            .toLowerCase()
            .includes(filterText.toLowerCase())
            ? true
            : acc;
          return result;
        }
        return acc;
      }, false);
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={filteredItems}
        pagination
        clearSelectedRows={clearSelectedRows}
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        onSelectedRowsChange={handleRowSelected}
        actions={actions}
        selectableRowDisabled={(row) => {
          return row.isDisabled !== undefined ? row.isDisabled : false;
        }}
        selectableRowsNoSelectAll
        // eslint-disable-next-line prettier/prettier
        contextActions={(
          <IconButton
            color="secondary"
            // eslint-disable-next-line no-console
            onClick={() => {
              onDelete(selectedRows);
              console.log(selectedRows);
            }}
          >
            <Delete />
          </IconButton>
          // eslint-disable-next-line prettier/prettier
        )}
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        highlightOnHover
        selectableRowsComponent={Checkbox}
      />
    </div>
  );
};
export default CustomTable;

// https://jbetancur.github.io/react-data-table-component/?path=/story/general--kitchen-sink
