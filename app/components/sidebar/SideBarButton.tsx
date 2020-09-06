import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  family: { id: string; name: string };
  callback: (familyid: string) => unknown;
  selected: boolean;
  className?: string;
};

export default function SideBarButton({
  family,
  callback,
  selected,
  className,
}: Props) {
  const buttonClicked = () => callback(family.id);
  return (
    <Button
      style={{
        width: 100,
        minWidth: 'fit-content',
      }}
      id={family.id}
      className={`${className} p-3 text-capitalize sidebarButton ${
        selected ? 'active' : ''
      }`}
      type="button"
      onClick={buttonClicked}
    >
      {family.name}
    </Button>
  );
}
