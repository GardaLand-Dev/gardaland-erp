/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clock from 'react-live-clock';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  Divider,
  Grid,
  Button,
  Icon,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import SimpleModal from '../manager/SimpleModal';
import CartRow from './CartRow';
import {
  selectCart,
  selectTab,
  addList,
  delArticle,
  incrQuantity,
  decQuantity,
  delList,
} from '../../reducers/cartSlice';
import TabButton from './TabButton';
// svgs
import {
  EmporterSvg,
  EmporterWhiteSvg,
  SaleWhiteSvg,
  SaleSvg,
  DeliveryWhiteSvg,
  DeliverySvg,
  KitchenSvg,
  AddSvg,
  DeleteSvg,
  MoneySvg,
} from '../../assets/svgs';
import orderService from '../../services/order.service';
//

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      height: 95,
      width: 100,
    },
    label: {
      flexDirection: 'column',
    },
    icon: {
      fontSize: '52px !important',
    },
  })
);
export default function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const cartState = useSelector(selectCart);
  const tabClicked = (tabnum: number) => dispatch(selectTab(tabnum));
  const addTabClicked = () => dispatch(addList());
  const delListClicked = () => dispatch(delList());
  const rowFuncs = {
    delRow: (index: number) => dispatch(delArticle(index)),
    incrQ: (index: number) => dispatch(incrQuantity(index)),
    decrQ: (index: number) => dispatch(decQuantity(index)),
  };

  const tabs: Array<JSX.Element> = cartState.lists.map((list) => (
    <TabButton
      key={list.tab}
      tabnum={list.tab}
      selected={list.tab === cartState.selectedTab}
      callback={tabClicked}
    />
  ));

  let rows: Array<JSX.Element> = [];
  const list = cartState.lists.find((lst) => lst.tab === cartState.selectedTab);
  if (list) {
    rows = list.rows.map((rw) => (
      <CartRow
        key={rw.index}
        index={rw.index}
        product={rw.product}
        q={rw.q}
        suppliments={rw.suppliments}
        funcs={rowFuncs}
      />
    ));
  }
  const getTotal = () => {
    if (list) {
      return list.rows.reduce((acc, rw) => {
        const { product } = rw;
        if (product) {
          const aprice = product.priceTTC;
          let supsp = 0;
          if (rw.suppliments) {
            rw.suppliments.forEach((sup) => {
              const supdata = sup.suppliment;
              if (supdata) supsp += supdata.price * sup.q;
            });
          }
          // eslint-disable-next-line no-param-reassign
          acc += (aprice + supsp) * rw.q;
        }
        return acc;
      }, 0);
    }
    return 0;
  };
  const [selected, setSelected] = useState('sale');
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const handlePayment = () => {
    const orderProducts = cartState.lists
      .find((lst) => lst.tab === cartState.selectedTab)
      .rows.map((v) => ({
        productId: v.product.id,
        quantity: v.q,
        suppliments: v.suppliments.map((s) => ({
          supplimentId: s.suppliment.id,
          quantity: s.q,
        })),
      }));
    orderService
      .createOrder({ orderProducts, num: 1, type: 'delivery' })
      .then((ok) => {
        console.log('created succ', ok);
        delListClicked();
        setSnackOpen(true);
        setPayModalVisible(false);
        // delete the current
        return true;
      })
      .catch(console.error);
  };

  return (
    <div className="d-flex flex-column h-100 table_container ">
      <div className="flex-shrink-1 mb-2 px-4 py-3 ">
        <h1 className="h5 m-0 color-gradient">Order # 7</h1>
        <div>
          {tabs}
          {/* <i className=" fa fa-plus-square fa-2x" /> */}
          <IconButton size="small" onClick={addTabClicked}>
            <AddCircleOutlineOutlinedIcon fontSize="large" />
          </IconButton>
          {/*  */}
        </div>
        {/* <hr className="ligne m-1"/> */}
        <p className="h5 m-0 float-right text-black-50">
          <Clock format="hh:mm:ss A" ticking />
          {/* 10:00:00 AM */}
        </p>
        <p className="m-0 text-capitalize text-black-50">
          {moment().format('dddd Do MMMM YYYY')}
          {/* saturday 28 july 2020 */}
        </p>
      </div>
      <Divider />

      {/* <Grid container justify="center" spacing={2} className="my-3 px-2">
        <Grid item xs>
          <Button
            id="sale"
            className={`colorButton color-gradient ${
              selected === 'sale' ? 'active' : ''
            }`}
            classes={{ root: useStyles().button, label: useStyles().label }}
            onClick={(e) => setSelected(e.currentTarget.id)}
          >
            <Icon className={useStyles().icon}>
              <img
                className="pb-5"
                alt="edit"
                src={selected === 'sale' ? SaleWhiteSvg : SaleSvg}
              />
            </Icon>
            sale
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            id="emporter"
            className={`colorButton color-gradient ${
              selected === 'emporter' ? 'active' : ''
            }`}
            classes={{ root: useStyles().button, label: useStyles().label }}
            onClick={(e) => setSelected(e.currentTarget.id)}
          >
            <Icon className={useStyles().icon}>
              <img
                className="pb-5"
                alt="edit"
                src={selected === 'emporter' ? EmporterWhiteSvg : EmporterSvg}
              />
            </Icon>
            Emporter
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            id="delivery"
            className={`colorButton color-gradient ${
              selected === 'delivery' ? 'active' : ''
            }`}
            classes={{ root: useStyles().button, label: useStyles().label }}
            onClick={(e) => setSelected(e.currentTarget.id)}
          >
            <Icon className={useStyles().icon}>
              <img
                className="pb-5"
                alt="edit"
                src={selected === 'delivery' ? DeliveryWhiteSvg : DeliverySvg}
              />
            </Icon>
            Delivery
          </Button>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3} justify="center" className="mb-1 px-4">
        <Grid item xs>
          <Button className="custButton color-gradient">
            <Icon fontSize="large" className="mx-2">
              <img className="pb-5" alt="edit" src={AddSvg} />
            </Icon>
            Add Customer
          </Button>
        </Grid>
        <Grid item xs>
          <Button className="custButton color-gradient">
            <Icon fontSize="large" className="mx-2">
              <img className="pb-5" alt="edit" src={KitchenSvg} />
            </Icon>
            Add Table
          </Button>
        </Grid>
      </Grid> */}

      {/* <Divider /> */}
      <div className="flex-grow-1 h-100 table of-x-auto customScrollBar ">
        <div className="d-flex flex-column">
          {/* make a list of rows */}
          {/* <CartRow /> */}
          {rows}
          {/*  */}
        </div>
      </div>
      <Divider />
      <Grid container>
        <Grid item xs>
          <span className="float-left mx-5 mt-2">Total</span>
        </Grid>
        <Grid item xs>
          <span className="float-right mx-5 mt-2">{`${getTotal()}DA`}</span>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs>
          <Button
            className="mt-5 mb-3 mx-3 py-3"
            variant="outlined"
            color="secondary"
            onClick={delListClicked}
          >
            <Icon fontSize="small" className="mx-2">
              <img className="pb-5" alt="edit" src={DeleteSvg} />
            </Icon>
            <span>Supprimer</span>
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className="btnsuccess mt-5 mb-3 mr-3 py-3 px-4"
            onClick={() => setPayModalVisible(true)}
          >
            <Icon fontSize="small" className="mx-2">
              <img className="pb-5" alt="edit" src={MoneySvg} />
            </Icon>
            <span className="text-white">Pay Now</span>
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          Commande passée avec succès
        </Alert>
      </Snackbar>
      <SimpleModal
        title="Paiement"
        onClose={() => setPayModalVisible(false)}
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment();
        }}
        visible={payModalVisible}
      >
        <Grid container direction="row">
          <Grid item className="flex-grow-1">
            <span>numpad</span>
          </Grid>
          <Grid item direction="column">
            <Grid item xs className="mb-2">
              <Button
                id="sale"
                className={`colorButton color-gradient ${
                  selected === 'sale' ? 'active' : ''
                }`}
                classes={{ root: useStyles().button, label: useStyles().label }}
                onClick={(e) => setSelected(e.currentTarget.id)}
              >
                <Icon className={useStyles().icon}>
                  <img
                    className="pb-5"
                    alt="edit"
                    src={selected === 'sale' ? SaleWhiteSvg : SaleSvg}
                  />
                </Icon>
                salle
              </Button>
            </Grid>
            <Grid item xs className="mb-2">
              <Button
                id="emporter"
                className={`colorButton color-gradient ${
                  selected === 'emporter' ? 'active' : ''
                }`}
                classes={{ root: useStyles().button, label: useStyles().label }}
                onClick={(e) => setSelected(e.currentTarget.id)}
              >
                <Icon className={useStyles().icon}>
                  <img
                    className="pb-5"
                    alt="edit"
                    src={
                      selected === 'emporter' ? EmporterWhiteSvg : EmporterSvg
                    }
                  />
                </Icon>
                Emporter
              </Button>
            </Grid>
            <Grid item xs className="mb-2">
              <Button
                id="delivery"
                className={`colorButton color-gradient ${
                  selected === 'delivery' ? 'active' : ''
                }`}
                classes={{ root: useStyles().button, label: useStyles().label }}
                onClick={(e) => setSelected(e.currentTarget.id)}
              >
                <Icon className={useStyles().icon}>
                  <img
                    className="pb-5"
                    alt="edit"
                    src={
                      selected === 'delivery' ? DeliveryWhiteSvg : DeliverySvg
                    }
                  />
                </Icon>
                Delivery
              </Button>
            </Grid>
            <Divider className="mb-2" />
            <Grid item xs>
              <Button
                className="colorButton color-gradient"
                classes={{ root: useStyles().button, label: useStyles().label }}
              >
                <Icon className={useStyles().icon}>
                  <img className="pb-5" alt="edit" src={AddSvg} />
                </Icon>
                Client
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <div className="p-0 ">
          <h1>change calc</h1>
          <h1>order type</h1>
          <h1>client</h1>
        </div> */}
      </SimpleModal>
    </div>
  );
}
