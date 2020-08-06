import React from 'react';

type Props = {
  famId: string;
  callback: (familyid: string) => unknown;
  selected: boolean;
};

export default function SideBarButton({ famId, callback, selected }: Props) {
  const buttonClicked = () => callback(famId);
  return (
    <button
      id={famId}
      className={`h5 p-3 text-capitalize sidebarButton ${
        selected ? 'active' : ''
      }`}
      type="button"
      onClick={buttonClicked}
    >
      {famId}
    </button>
  );
}
