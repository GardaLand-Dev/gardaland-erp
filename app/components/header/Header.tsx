import React from 'react';
import { faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <div className="test d-flex flex-row justify-content-end align-items-center bg-white mx-3 mt-3 mb-0 p-3 rounded-xlg ">
      <div className="d-flex flex-row align-items-center theme-gradient rounded mx-3 p-3">
        {/* <i className="fa fa-user-circle fa-2x mr-4 " /> */}
        <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-4" />
        <span className="align-top text-capitalize">benzaamia rabie</span>
      </div>
      <button type="button" className="btn p-0 text-secondary fa fa-cog fa-2x">
        <FontAwesomeIcon icon={faCog} size="2x" />
      </button>
    </div>
  );
}
