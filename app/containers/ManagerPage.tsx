import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/manager/SideBar';
import routes from '../constants/routes.json';
import ProductList from '../components/manager/features/product/ProductList';
import FamilleList from '../components/manager/features/Famille/FamilleList';
import VenteList from '../components/manager/features/Vente/VenteList';
import StockList from '../components/manager/features/Stock/StockList';
import Station from '../components/manager/features/Station/Station';
import Expense from '../components/manager/features/Achat/Expense';
import Facture from '../components/manager/features/Achat/Facture';
import StockFacture from '../components/manager/features/Stock/StockFacture';
import Account from '../components/manager/features/finance/Account';
import Users from '../components/manager/features/Personnes/Users';
import Clients from '../components/manager/features/Personnes/Clients';
import Fournisseurs from '../components/manager/features/Personnes/Fournisseurs';
import Employee from '../components/manager/features/GRH/Employee';
import Payroll from '../components/manager/features/GRH/Payroll';
import Attendance from '../components/manager/features/GRH/Attendance';
import StockDamage from '../components/manager/features/Stock/StockDamage';
import { logout } from '../reducers/authentication.reducer';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },
    },
    appBar: {
      background: 'transparent',
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      border: 'none',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
export default function MangerPage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="theme-gradient-y h-100 overflow-auto">
      <div className={classes.toolbar} />
      <SideBar />
    </div>
  );
  const dispatch = useDispatch();
  return (
    <div className={`${classes.root} h-100 overflow-auto`}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="bg-white m-3 rounded-xlg justify-content-between align-items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <div className="">
            <span className="text-black-50">Chouieur food & helado </span>
          </div>
          <div className="d-flex flex-row">
            <div className="d-flex flex-row align-items-center theme-gradient rounded mx-2 py-3 px-2">
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              <span
                className="align-top text-capitalize"
                style={{ fontSize: '0.9rem' }}
              >
                benzaamia rabie
              </span>
            </div>
            <Button
              onClick={() => {
                dispatch(logout());
              }}
              className="text-secondary"
              type="button"
            >
              <ExitToAppIcon style={{ fontSize: 30 }} />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        className={`${classes.content} h-100 overflow-auto p-3 pt-5 theme-background`}
      >
        <div className={classes.toolbar} />
        <Route
          path={routes.MANAGER.ProductManagement.ProductList}
          component={ProductList}
        />
        <Route
          path={routes.MANAGER.ProductManagement.FamilleList}
          component={FamilleList}
        />
        <Route
          path={routes.MANAGER.ProductManagement.Station}
          component={Station}
        />
        <Route path={routes.MANAGER.Achat.Expense} component={Expense} />
        <Route path={routes.MANAGER.Achat.Facture} component={Facture} />
        <Route
          path={routes.MANAGER.StockManagement.Facture}
          component={StockFacture}
        />
        <Route
          path={routes.MANAGER.FinanceManagement.Account}
          component={Account}
        />
        <Route
          path={routes.MANAGER.PersonnesManagement.Users}
          component={Users}
        />
        <Route
          path={routes.MANAGER.PersonnesManagement.Clients}
          component={Clients}
        />
        <Route
          path={routes.MANAGER.PersonnesManagement.Fournisseurs}
          component={Fournisseurs}
        />
        <Route
          path={routes.MANAGER.HumanResourceManagement.Employee}
          component={Employee}
        />
        <Route
          path={routes.MANAGER.HumanResourceManagement.Payroll}
          component={Payroll}
        />
        <Route
          path={routes.MANAGER.HumanResourceManagement.Attendance}
          component={Attendance}
        />
        <Route
          path={routes.MANAGER.VenteManagement.root}
          component={VenteList}
        />
        <Route
          path={routes.MANAGER.StockManagement.List}
          component={StockList}
        />
        <Route
          path={routes.MANAGER.StockManagement.Damaged}
          component={StockDamage}
        />
        <Route
          path={routes.MANAGER.root}
          render={() => (
            <Redirect to={routes.MANAGER.ProductManagement.ProductList} />
          )}
          exact
        />
      </main>
    </div>
    // <div className="d-flex flex-row w-100 h-100 ">
    //   <div className="h-100 managerSideBar of-x-auto theme-gradient-y">
    //     <h4 className="my-5 mx-4 text-wrap">Chouieur food & helado</h4>
    //     <SideBar />
    //   </div>
    //   <div className="d-flex flex-column flex-grow-1 h-100 theme-background">
    //     <div className="m-3 p-0">
    //       <Header />
    //     </div>
    //     <div className="flex-grow-1 mx-3 ">
    //       {/* Features */}
    //       <Route
    //         path={routes.MANAGER.ProductManagement.ProductList}
    //         component={ProductList}
    //       />
    //       <Route
    //         path={routes.MANAGER.ProductManagement.FamilleList}
    //         component={FamilleList}
    //       />
    //       <Route
    //         path={routes.MANAGER.ProductManagement.Station}
    //         component={Station}
    //       />
    //       <Route path={routes.MANAGER.Achat.Expense} component={Expense} />
    //       <Route path={routes.MANAGER.Achat.Facture} component={Facture} />
    //       <Route
    //         path={routes.MANAGER.StockManagement.Facture}
    //         component={StockFacture}
    //       />
    //       <Route
    //         path={routes.MANAGER.FinanceManagement.Account}
    //         component={Account}
    //       />
    //       <Route
    //         path={routes.MANAGER.PersonnesManagement.Users}
    //         component={Users}
    //       />
    //       <Route
    //         path={routes.MANAGER.PersonnesManagement.Clients}
    //         component={Clients}
    //       />
    //       <Route
    //         path={routes.MANAGER.PersonnesManagement.Fournisseurs}
    //         component={Fournisseurs}
    //       />
    //       <Route
    //         path={routes.MANAGER.HumanResourceManagement.Employee}
    //         component={Employee}
    //       />
    //       <Route
    //         path={routes.MANAGER.HumanResourceManagement.Payroll}
    //         component={Payroll}
    //       />
    //       <Route
    //         path={routes.MANAGER.HumanResourceManagement.Attendance}
    //         component={Attendance}
    //       />
    //       <Route
    //         path={routes.MANAGER.VenteManagement.root}
    //         component={VenteList}
    //       />
    //       <Route
    //         path={routes.MANAGER.StockManagement.List}
    //         component={StockList}
    //       />
    //       <Route
    //         path={routes.MANAGER.StockManagement.Damaged}
    //         component={StockDamage}
    //       />
    //       <Route
    //         path={routes.MANAGER.root}
    //         render={() => (
    //           <Redirect to={routes.MANAGER.ProductManagement.ProductList} />
    //         )}
    //         exact
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
