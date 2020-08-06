import React from 'react';
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
                <div className="d-flex flex-column mr-auto">
                  <p className="m-0">{suppliment.id}</p>
                  <p className="m-0 text-secondary">
                    {`${suppliment.price}DA`}
                  </p>
                </div>
                <button
                  id={suppliment.id}
                  className="btn px-1 text-black-50 ml-4"
                  type="button"
                  // eslint-disable-next-line no-console
                  onClick={() => console.log('clicked on minus')}
                >
                  <i className="fa fa-minus" />
                </button>
                <span className="mx-2">qunatity (nmbr)</span>
                <button
                  id={suppliment.id}
                  className="btn px-1 text-black-50"
                  type="button"
                  // eslint-disable-next-line no-console
                  onClick={() => console.log('clicked on plus')}
                >
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="dropdown-divider" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
