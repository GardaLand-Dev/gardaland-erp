import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  famId: string;
  callback: (familyid: string) => unknown;
  selected: boolean;
  className?: string;
};

export default function SideBarButton({
  famId,
  callback,
  selected,
  className,
}: Props) {
  const buttonClicked = () => callback(famId);
  return (
    <Button
      style={{
        width: 100,
        minWidth: 'fit-content',
      }}
      id={famId}
      className={`${className} p-3 text-capitalize sidebarButton ${
        selected ? 'active' : ''
      }`}
      type="button"
      onClick={buttonClicked}
    >
      {famId}
    </Button>
  );
}
