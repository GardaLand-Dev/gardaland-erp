import React from 'react';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import { TextField } from '@material-ui/core';
import data from '../../services/api';
// TODO: try using popper js v2 ?

export default function SuppDropdown(): JSX.Element {
  return (
    <div className="btn-group mr-3">
      <button
        className="btn btn-secondary dropdown-toggle text-capitalize"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        suppliments
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {data.suppliments.map((suppliment) => {
          return (
            <React.Fragment key={suppliment.id}>
              <div className="d-flex flex-row align-items-center dropdown-item text-capitalize ">
                {/* modify here the suppliment styling */}
                <div className="d-flex flex-column">
                  <p className="m-0">{suppliment.id}</p>
                  <p className="m-0 text-secondary">
                    {`${suppliment.price}DA`}
                  </p>
                </div>
                <TextField
                  id="outlined-number"
                  label="Quantité"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  variant="outlined"
                />
              </div>
              <div className="dropdown-divider" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
