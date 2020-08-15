import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import SuppDropdown from '../components/home/SuppDropdown';
import CommentDropdown from '../components/home/CommentDropdown';
import Cart from '../components/cart/Cart';
import { selectFamily, selectSelectedFamily } from '../reducers/homePageSlice';
import MenuArticles from '../components/article/MenuArticles';
import Header from '../components/header/Header';

export default function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const selectedFam = useSelector(selectSelectedFamily);
  const famSelect = (familyId: string) => dispatch(selectFamily(familyId));
  return (
    <div className="d-flex h-100">
      <div className="bg-light border-right sidebarWrapper overflow-auto customScrollBar h-100">
        <Sidebar callback={famSelect} selectedFam={selectedFam} />
      </div>
      <div className="pageContentWrapper">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="mt-3 px-3">
            {/* <p> suppliments here</p> */}
            <SuppDropdown />
            <CommentDropdown />
          </div>
          <div className="flex-grow-1 h-100 of-hidden">
            <div className="d-flex h-100 flex-row align-items-stretch mt-3">
              <div className="w-100 pl-3">
                <div className="p-0 h-100 overflow-auto customScrollBar">
                  <MenuArticles />
                </div>
                {/* menuarticles here */}
              </div>
              <div className="p-0 cartWidth">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
