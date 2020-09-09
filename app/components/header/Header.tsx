import React from 'react';
import { useDispatch } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
  InputBase,
  Divider,
} from '@material-ui/core';
import { logout } from '../../reducers/authentication.reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'gray',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
);

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className="d-flex flex-row justify-content-between align-items-center bg-white p-3 rounded-xlg ">
      <div className="">
        <span className="text-black-50">Chouieur food & helado </span>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <div className="d-flex flex-row ">
        <div className="d-flex flex-row align-items-center theme-gradient rounded mx-2 py-3 px-2">
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
      </div>
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
