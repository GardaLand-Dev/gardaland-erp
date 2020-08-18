import React from 'react';

export default function MenuManagement(): JSX.Element {
  return (
    <div className="d-flex flex-column h-100">
      <div className="menuManagementToolbar bg-primary text-white">toolbar</div>
      <div className="flex-grow-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">family</th>
              <th scope="col">price</th>
              <th scope="col">pic</th>
            </tr>
          </thead>
          {/* <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody> */}
        </table>
      </div>
    </div>
  );
}
