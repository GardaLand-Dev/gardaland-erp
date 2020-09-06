import React from 'react';
import { useSelector } from 'react-redux';
import SideBarButton from './sideBarButton';
import { selectData } from '../../reducers/data.reducer';
// TODO: redisign this shit is ugly
type Props = {
  callback: (familyId: string) => unknown;
  selectedFam: string;
};
export default function Sidebar({ callback, selectedFam }: Props): JSX.Element {
  const data = useSelector(selectData);
  const families = data?.map((family) => ({
    id: family.id,
    name: family.name,
  }));

  return (
    <div className="d-flex flex-row w-100 p-0">
      {families?.map((fam, i) => (
        <SideBarButton
          key={fam.id}
          family={fam}
          selected={fam.id === selectedFam}
          callback={callback}
          className={i === families.length - 1 ? '' : 'mr-2'}
        />
      ))}
    </div>
  );
}
