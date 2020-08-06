import React from 'react';
import data from '../../services/api';

type Props = {
  id: string;
  callback: (id: string) => void;
};

export default function Article({ id, callback }: Props): JSX.Element {
  const art = data.getArticle(id);
  const buttonClicked = () => callback(id);
  return (
    <button
      className="btn text-left col pt-0 pb-3 pr-0 pl-3"
      type="button"
      onClick={buttonClicked}
    >
      <div className="card text-white rounded-xlg border-0 card">
        <img src={art?.img} className="card-img rounded-xlg" alt="..." />
        <div className="card-img-overlay">
          <div>
            <h4 className="card-text theme-gradient badge my-2 py-2 px-3">
              {`${art?.price} DA`}
            </h4>
          </div>
          <div>
            <h2 className="card-title badge py-2 px-2  text-capitalize cardTitle">
              {art?.id}
            </h2>
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
