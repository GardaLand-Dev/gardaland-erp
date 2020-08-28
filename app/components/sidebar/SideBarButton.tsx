import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  famId: string;
  callback: (familyid: string) => unknown;
  selected: boolean;
};

export default function SideBarButton({ famId, callback, selected }: Props) {
  const buttonClicked = () => callback(famId);
  return (
    <Button
      style={{
        width: 100,
      }}
      id={famId}
      className={`p-3 text-capitalize sidebarButton my-2 ${
        selected ? 'active' : ''
      }`}
      type="button"
      onClick={buttonClicked}
    >
      {famId}
    </Button>
  );
}
