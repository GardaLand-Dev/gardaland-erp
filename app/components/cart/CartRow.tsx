import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Input } from '@material-ui/core';
import { Suppliment, Product } from '../../reducers/cartSlice';

type Props = {
  index: number;
  product: Product;
  q: number;
  suppliments?: Array<{ suppliment: Suppliment; q: number }>;
  funcs: {
    delRow: (index: number) => void;
    incrQ: (index: number) => void;
    decrQ: (index: number) => void;
    setQ: (index: number, value: number) => void;
  };
};

export default function CartRow({
  index,
  product,
  q,
  suppliments,
  funcs,
}: Props): JSX.Element {
  const delClicked = () => funcs.delRow(index);
  const incrClicked = () => funcs.incrQ(index);
  const decrClicked = () => funcs.decrQ(index);
  const qChanged = (value) => funcs.setQ(index, value);
  const getTotal = () => {
    if (product) {
      const aprice = product.priceTTC;
      let supsp = 0;
      if (suppliments) {
        suppliments.forEach((sup) => {
          const supdata = sup.suppliment;
          if (supdata) supsp += supdata.price * sup.q;
        });
      }
      return (aprice + supsp) * q;
    }
    return 0;
  };
  let suplist: Array<JSX.Element> = [];
  if (suppliments) {
    suplist = suppliments.map((sup) => (
      <p key={sup.suppliment.id} className="m-05 p-1 rounded ">
        {sup.suppliment.name}
        {/* Cheese */}
        <i>
          {`@${sup.suppliment.price}da`}
          {/* @20da */}
        </i>
        <span className="font-weight-bold">
          {` x${sup.q}`}
          {/* x2 */}
        </span>
      </p>
    ));
  }

  return (
    <div
      className="d-flex flex-column border-bottom p-2 custom-row selected"
      // onClick={this.handleRowClick} this should not be here should include a event listener
    >
      <div className="d-flex flex-row align-items-center w-100">
        <div className="">
          <button
            // onClick={deletefunction}
            className="btn text-danger pl-0"
            type="button"
            onClick={delClicked}
          >
            {/* <i className="fa fa-trash-o fa-2x" /> */}
            {/* <i className="fas fa-trash-alt" /> */}
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        <div className="mr-auto">
          <p
            className="m-0 font-weight-semibold text-capitalize"
            style={{ width: '15ch' }}
          >
            {product.name}
            {/* pizza fdm */}
          </p>
          <p className="m-0 text-black-50 font-italic">
            {`@${product?.priceTTC} da`}
          </p>
        </div>
        <div className="mx-2">
          <div className="d-flex flex-row align-items-stretch theme-gradient-y rounded-xlg p-025 ">
            <div className="d-flex justify-content-center align-items-center px-0 col-6 bg-white rounded-left-xlg text-body">
              <Input
                className="my-0 font-weight-semibold "
                // style={{ width: '3ch' }}
                type="number"
                value={q}
                onChange={(e) => {
                  const val = e.currentTarget.value
                    ? parseInt(e.currentTarget.value, 10)
                    : 1;
                  qChanged(val);
                }}
                inputProps={{
                  className: 'text-center',
                  style: { width: '3ch', padding: 0 },
                }}
                disableUnderline
              />
              {/* quantity */}
            </div>
            <div className="d-flex flex-column col-6 px-0">
              <div className="quant-icon border-bottom border-white-25">
                <button
                  // onClick={this.increaseQunatity}
                  className="btn text-white py-0"
                  type="button"
                  onClick={incrClicked}
                >
                  {/* <i className="fa fa-chevron-up" /> */}
                  <FontAwesomeIcon icon={faChevronUp} />
                  {/* {'increment quantity'} */}
                </button>
              </div>
              <div className="quant-icon">
                <button
                  // onClick={this.decreaseQunatity}
                  className="btn text-white py-0"
                  type="button"
                  onClick={decrClicked}
                >
                  {/* <i className="fa fa-chevron-down" /> */}
                  <FontAwesomeIcon icon={faChevronDown} />
                  {/* decrement quantity */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-0" style={{ width: '8ch' }}>
          <p className="m-0 font-weight-semibold text-right">{`${getTotal()}DA`}</p>
        </div>
      </div>
      <div className="d-flex flex-column flex-wrap w-100 suppliments pl-5">
        {/* below is a suppliment */}
        {suplist}
      </div>
    </div>
  );
}
