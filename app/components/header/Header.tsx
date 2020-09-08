import React from 'react';
import { useDispatch } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Badge from '@material-ui/core/Badge';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../reducers/authentication.reducer';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="d-flex flex-row justify-content-end align-items-center bg-white p-3 rounded-xlg ">
      <div className="d-flex flex-row align-items-center theme-gradient rounded mx-2 p-2">
        <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
        <span
          className="align-top text-capitalize"
          style={{ fontSize: '0.9rem' }}
        >
          benzaamia rabie
        </span>
      </div>
      {/* <Badge badgeContent={4} color="secondary" className="mx-3">
        <MailOutlineOutlinedIcon
          className="text-secondary"
          style={{ fontSize: 30 }}
        />
      </Badge> */}
      <button
        onClick={() => {
          dispatch(logout());
        }}
        className="btn p-0 text-secondary"
        type="button"
        id="dropdownMenuButton3"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <ExitToAppIcon style={{ fontSize: 30 }} />
      </button>

      {/* FIXME: style the dropdown menu */}
      {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
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
      </div> */}
    </div>
  );
}
