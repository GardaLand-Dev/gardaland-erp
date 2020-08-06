import React from 'react';

type Props = {
  tabnum: number;
  selected: boolean;
  callback: (tabnum: number) => void;
};
export default function TabButton({ tabnum, selected, callback }: Props) {
  const buttonClicked = () => callback(tabnum);
  return (
    <button
      className={`btn mr-1 text-white-50 ${
        selected ? 'text-white bg-white-25' : ''
      }`}
      type="button"
      onClick={buttonClicked}
    >
      {tabnum}
    </button>
  );
}
