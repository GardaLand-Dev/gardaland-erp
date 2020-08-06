import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import data from '../../services/api';
import { Suppliment } from '../../reducers/cartSlice';

type Props = {
  index: number;
  articleId: string;
  q: number;
  suppliments?: Array<Suppliment>;
  funcs: {
    delRow: (index: number) => void;
    incrQ: (index: number) => void;
    decrQ: (index: number) => void;
  };
};

export default function CartRow({
  index,
  articleId,
  q,
  suppliments,
  funcs,
}: Props): JSX.Element {
  const delClicked = () => funcs.delRow(index);
  const incrClicked = () => funcs.incrQ(index);
  const decrClicked = () => funcs.decrQ(index);

  const article = data.getArticle(articleId);
  const getTotal = () => {
    if (article) {
      const aprice = article.price;
      let supsp = 0;
      if (suppliments) {
        suppliments.forEach((sup) => {
          const supdata = data.getSuppliment(sup.supId);
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
      <p key={sup.supId} className="m-05 p-1 rounded ">
        {sup.supId}
        {/* Cheese */}
        <i>
          {`@${data.getSuppliment(sup.supId)?.price}da`}
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
      className="d-flex flex-column border-bottom p-4 custom-row selected"
      // onClick={this.handleRowClick} this should not be here should include a event listener
    >
      <div className="d-flex flex-row align-items-center w-100">
        <div className="">
          <button
            // onClick={deletefunction}
            className="btn text-danger"
            type="button"
            onClick={delClicked}
          >
            {/* <i className="fa fa-trash-o fa-2x" /> */}
            {/* <i className="fas fa-trash-alt" /> */}
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        <div className="mr-auto">
          <p className="m-0 font-weight-semibold text-capitalize">
            {articleId}
            {/* pizza fdm */}
          </p>
          <p className="m-0 text-black-25 font-italic">
            {`@${article?.price} da`}
            {/* @400DA */}
          </p>
        </div>
        <div className="mx-4">
          <div className="d-flex flex-row align-items-stretch theme-gradient-y rounded-xlg p-025 ">
            <div className="d-flex justify-content-center align-items-center col-6 bg-white rounded-left-xlg text-body">
              <p className="my-0 font-weight-semibold">
                {/* quantity */}
                {q}
              </p>
            </div>
            <div className="d-flex flex-column col-6 px-0">
              <div className="quant-icon border-bottom border-white-25">
                <button
                  // onClick={this.increaseQunatity}
                  className="btn text-white py-1"
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
                  className="btn text-white-50 py-1"
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
        <div className="">
          <p className="m-0 font-weight-semibold">{`${getTotal()}DA`}</p>
        </div>
      </div>
      <div className="d-flex flex-column flex-wrap w-100 suppliments pl-5">
        {/* below is a suppliment */}
        {suplist}
      </div>
    </div>
  );
}
