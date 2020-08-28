/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clock from 'react-live-clock';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { Divider, Grid, Button, Icon, IconButton } from '@material-ui/core';
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
import data from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
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
        articleId={rw.articleId}
        q={rw.q}
        suppliments={rw.suppliments}
        funcs={rowFuncs}
      />
    ));
  }
  const getTotal = () => {
    if (list) {
      return list.rows.reduce((acc, rw) => {
        const article = data.getArticle(rw.articleId);
        if (article) {
          const aprice = article.price;
          let supsp = 0;
          if (rw.suppliments) {
            rw.suppliments.forEach((sup) => {
              const supdata = data.getSuppliment(sup.supId);
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
  return (
    <div className="d-flex flex-column h-100 table_container ">
      <div className="flex-shrink-1 mb-2 px-4 py-3 ">
        <h1 className="h5 m-0 color-gradient">Order # 7</h1>
        <div>
          {tabs}
          {/* <i className=" fa fa-plus-square fa-2x" /> */}
          <IconButton size="small">
            <AddCircleOutlineOutlinedIcon
              fontSize="large"
              onClick={addTabClicked}
            />
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

      <Grid container justify="center" spacing={2} className="my-3 px-2">
        <Grid item xs>
          <Button
            id="sale"
            className={`colorButton color-gradient ${
              selected === 'sale' ? 'active' : ''
            }`}
            classes={{ root: useStyles().button, label: useStyles().label }}
            onClick={(e) => setSelected(e.currentTarget.id)}
          >
            {selected === 'sale' ? (
              // eslint-disable-next-line react-hooks/rules-of-hooks
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="sale-white.svg" />
              </Icon>
            ) : (
              // eslint-disable-next-line react-hooks/rules-of-hooks
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="sale.svg" />
              </Icon>
            )}
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
            {selected === 'emporter' ? (
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="emporter-white.svg" />
              </Icon>
            ) : (
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="emporter.svg" />
              </Icon>
            )}
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
            {selected === 'delivery' ? (
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="delivery-white.svg" />
              </Icon>
            ) : (
              <Icon className={useStyles().icon}>
                <img className="pb-5" alt="edit" src="delivery.svg" />
              </Icon>
            )}
            Delivery
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center" className="mb-1 px-4">
        <Grid item xs>
          <Button className="custButton color-gradient">
            <Icon fontSize="large" className="mx-2">
              <img className="pb-5" alt="edit" src="add.svg" />
            </Icon>
            Add Customer
          </Button>
        </Grid>
        <Grid item xs>
          <Button className="custButton color-gradient">
            <Icon fontSize="large" className="mx-2">
              <img className="pb-5" alt="edit" src="kitchen.svg" />
            </Icon>
            Add Table
          </Button>
        </Grid>
      </Grid>

      <Divider />
      <div className="flex-grow-1 h-100 table of-x-auto customScrollBar ">
        <div className="d-flex flex-column">
          {/* make a list of rows */}
          {/* <CartRow /> */}
          {rows}
          {/*  */}
        </div>
      </div>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs>
          <span className="float-left mx-5 mt-2">Total</span>
        </Grid>
        <Grid item xs>
          <span className="float-right mx-5 mt-2">{`${getTotal()}DA`}</span>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={3}>
        <Grid item xs>
          <Button
            className="mt-5 mb-3 ml-3 py-3"
            variant="outlined"
            color="secondary"
            onClick={delListClicked}
          >
            <Icon fontSize="small" className="mx-2">
              <img className="pb-5" alt="edit" src="delete.svg" />
            </Icon>
            <span>Supprimer</span>
          </Button>
        </Grid>
        <Grid item xs>
          <Button className="btnsuccess  mt-5 mb-3 py-3 px-4">
            <Icon fontSize="small" className="mx-2">
              <img className="pb-5" alt="edit" src="money.svg" />
            </Icon>
            <span className="text-white">Pay Now</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
