import React from 'react';
// TODO: try using popper js v2 ?
export default function CommentDropdown(): JSX.Element {
  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary text-capitalize dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Commentaire
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <form action="">
          <div className="d-flex flex-column dropdown-item">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-capitalize p-1" htmlFor="ta">
              insérer une remarque
            </label>
            <textarea
              style={{ width: '300px' }}
              name="ta"
              id="ta"
              cols={500}
              rows={10}
            />
            <button
              className="btn btn-secondary float-right mt-2 mr-auto text-capitalize"
              type="button"
            >
              sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
