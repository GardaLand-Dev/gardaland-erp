import React, { useEffect } from 'react';
import { Product } from '../../reducers/cartSlice';

type Props = {
  article: Product;
  callback: (id: Product) => void;
};

export default function Article({ article, callback }: Props): JSX.Element {
  const buttonClicked = () => callback(article);
  return (
    <button
      className="btn text-left col pt-0 pb-3 pr-0 pl-3"
      type="button"
      onClick={buttonClicked}
    >
      <div className="card text-white rounded-xlg border-0 card">
        <img
          // src={localStorage.getItem(article.id)}
          src={`http://localhost:3333/imgs/${article.id}`}
          className="card-img rounded-xlg"
          alt="..."
        />
        <div className="card-img-overlay">
          <div>
            <h4 className="card-text theme-gradient badge my-2 py-2 px-3">
              {`${article?.priceTTC} DA`}
            </h4>
          </div>
          <div>
            <p
              className="card-title badge py-2 px-2 text-capitalize cardTitle text-wrap"
              style={{ maxWidth: '16ch' }}
            >
              {article?.name}
            </p>
          </div>
        </div>
      </div>
    </button>
    // <div className="col pt-0 pb-3 pr-0 pl-3">
    //   <div className="card text-white rounded-xlg border-0 card">
    //     <img src={art?.img} className="card-img rounded-xlg" alt="..." />
    //     <div className="card-img-overlay">
    //       <div>
    //         <h4 className="card-text theme-gradient badge my-2 py-2 px-3">
    //           {`${art?.price} DA`}
    //         </h4>
    //       </div>
    //       <div>
    //         <h2 className="card-title badge py-2 px-2  text-capitalize cardTitle">
    //           {art?.id}
    //         </h2>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
