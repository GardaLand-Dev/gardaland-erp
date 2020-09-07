import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import data from '../../services/api';
import Article from './Article';
import { selectSelectedFamily } from '../../reducers/homePageSlice';
import { addArticle, Product } from '../../reducers/cartSlice';
import { selectData } from '../../reducers/data.reducer';

export default function MenuArticles() {
  const dispatch = useDispatch();
  const selectedFamily = useSelector(selectSelectedFamily);
  const data = useSelector(selectData);
  const list = data?.find((family) => selectedFamily === family.id);
  const cb = (article: Product) => dispatch(addArticle(article));
  let articles: Array<JSX.Element> = [];
  if (list)
    articles = list.products.map((art) => (
      <Article key={art.id} article={art} callback={cb} />
    ));
  return (
    <div
      className="row ml-n3 mr-0 pb-3 row-cols-3 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6"
      style={{ width: 'calc(100% + 15px)' }}
    >
      {articles}
    </div>
  );
}
