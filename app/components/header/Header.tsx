import React from 'react';
import { useDispatch } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Badge from '@material-ui/core/Badge';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { logout } from '../../reducers/authentication.reducer';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="d-flex flex-row justify-content-end align-items-center bg-white m-0 p-3 rounded-xlg ">
      <div className="d-flex flex-row align-items-center theme-gradient rounded mx-2 p-3">
        <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-4" />
        <span className="align-top text-capitalize">benzaamia rabie</span>
      </div>
      <Badge badgeContent={4} color="secondary" className="mx-3">
        <MailOutlineOutlinedIcon
          className="text-secondary"
          style={{ fontSize: 30 }}
        />
      </Badge>
      <button
        className="btn p-0 text-secondary"
        type="button"
        id="dropdownMenuButton3"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <SettingsOutlinedIcon style={{ fontSize: 30 }} />
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
