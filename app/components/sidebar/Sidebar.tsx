import React from 'react';
import data from '../../services/api';
import SideBarButton from './sideBarButton';
// TODO: redisign this shit is ugly
type Props = {
  callback: (familyId: string) => unknown;
  selectedFam: string;
};
export default function Sidebar({ callback, selectedFam }: Props): JSX.Element {
  const families = data.families.map((family) => family.id);
  return (
    <div className="w-100">
      <ul className="list-unstyled">
        {families.map((fam) => (
          <li key={fam} className="text-center py-3">
            <SideBarButton
              famId={fam}
              selected={fam === selectedFam}
              callback={callback}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
