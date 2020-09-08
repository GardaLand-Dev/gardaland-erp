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
      // className={`btn mr-1 text-white-50 ${
      //   selected ? 'text-white bg-white-25' : ''
      // }`}
      type="button"
      onClick={buttonClicked}
      className={`tabnum mr-1 my-3 px-3 py-2 ${selected ? 'active' : ''}`}
    >
      {tabnum}
    </button>
  );
}
