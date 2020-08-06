import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import {
  faPlusSquare,
  faTrash,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import Clock from 'react-live-clock';
import moment from 'moment';
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

  return (
    <div className="d-flex flex-column h-100 table_container px-3">
      <div className="flex-shrink-1 mb-2 px-4 py-3 rounded-top-xlg theme-gradient">
        <h1 className="h5 m-0">New Order</h1>
        <div>
          {tabs}
          <button
            className="btn p-0 text-white"
            type="button"
            onClick={addTabClicked}
          >
            {/* <i className=" fa fa-plus-square fa-2x" /> */}
            <FontAwesomeIcon icon={faPlusSquare} size="2x" />
            {/*  */}
          </button>
        </div>
        {/* <hr className="ligne m-1"/> */}
        <p className="h5 m-0 float-right">
          <Clock format="hh:mm:ss A" ticking />
          {/* 10:00:00 AM */}
        </p>
        <p className="text-white-50 m-0 text-capitalize ">
          {moment().format('dddd Do MMMM YYYY')}
          {/* saturday 28 july 2020 */}
        </p>
      </div>
      <div className="flex-grow-1 h-100 table of-x-auto customScrollBar">
        <div className="d-flex flex-column">
          {/* make a list of rows */}
          {/* <CartRow /> */}
          {rows}
          {/*  */}
        </div>
      </div>
      <div className="container bg-white py-3">
        <div className="row row-cols-2 pb-3">
          <div className="col">
            <span className="float-left mx-2">Total</span>
          </div>
          <div className="col">
            {/* <span className="float-right mx-2">200DA</span> */}
            <span className="float-right mx-2">{`${getTotal()}DA`}</span>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-danger mx-2 mt-5 py-3  "
              type="button"
              onClick={delListClicked}
            >
              {/* <i className="fa fa-trash fa-lg mr-3" /> */}
              <span>
                <FontAwesomeIcon icon={faTrash} size="lg" className="mr-3" />
                Supprimer
              </span>
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-success  btn-block mt-5 py-3 "
              // onClick={this.handlePay}
              type="button"
            >
              {/* <i className="fa fa-money fa-lg mr-3" /> */}
              <span>
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  size="lg"
                  className="mr-3"
                />
                Pay Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
