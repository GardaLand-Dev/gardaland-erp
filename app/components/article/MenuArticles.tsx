import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import data from '../../services/api';
import Article from './Article';
import { selectSelectedFamily } from '../../reducers/homePageSlice';
import { addArticle } from '../../reducers/cartSlice';

export default function MenuArticles() {
  const dispatch = useDispatch();
  const selectedFamily = useSelector(selectSelectedFamily);
  const list = data.families.find((family) => selectedFamily === family.id);
  const cb = (articleId: string) => dispatch(addArticle(articleId));
  let articles: Array<JSX.Element> = [];
  if (list)
    articles = list.articles.map((art) => (
      <Article key={art.id} id={art.id} callback={cb} />
    ));
  return (
    <div className="row ml-n3 mr-0 pb-3 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
      {articles}
    </div>
  );
}
