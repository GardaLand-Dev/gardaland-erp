import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import routes from '../../constants/routes.json';

export default function Sidebar(): JSX.Element {
  return (
    <div className="w-100">
      <Logo />
      <ul className="list-unstyled">
        <li className="text-center py-3">
          <Link to={`${routes.MANAGER}`}>Menu Management</Link>
        </li>
        <li className="text-center py-3">
          <Link to={`${routes.MANAGER}/StaffManagement`}>Staff Management</Link>
        </li>
      </ul>
    </div>
  );
}
