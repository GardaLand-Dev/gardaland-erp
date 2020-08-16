import React from 'react';
import { useDispatch } from 'react-redux';
import { faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../reducers/authentication.reducer';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="test d-flex flex-row justify-content-end align-items-center bg-white mx-3 mt-3 mb-0 p-3 rounded-xlg ">
      <div className="d-flex flex-row align-items-center theme-gradient rounded mx-3 p-3">
        <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-4" />
        <span className="align-top text-capitalize">benzaamia rabie</span>
      </div>
      <button
        className="btn p-0 text-secondary fa fa-cog fa-2x"
        type="button"
        id="dropdownMenuButton3"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faCog} size="2x" />
      </button>
      {/* FIXME: style the dropdown menu */}
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
        <ul>
          <button
            type="button"
            onClick={() => {
              dispatch(logout());
            }}
          >
            logout
          </button>
        </ul>
      </div>
    </div>
  );
}
