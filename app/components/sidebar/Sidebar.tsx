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
    <div className="d-flex flex-row w-100 p-0">
      {families.map((fam, i) => (
        <SideBarButton
          key={fam}
          famId={fam}
          selected={fam === selectedFam}
          callback={callback}
          className={i === families.length - 1 ? '' : 'mr-2'}
        />
      ))}
    </div>
  );
}
