import React from 'react';

import { Item } from './item';
import { rhythm } from '../../utils/typography';

import './index.scss';

export const Category = ({ categories, category, selectCategory, posts }) => {
  return (
    <ul className="category-container" role="tablist" id="category">
      <Item
        title={'All'}
        posts={posts}
        category={category}
        selectCategory={selectCategory}
      />
      {categories.map((item, idx) => (
        <Item
          posts={posts}
          key={idx}
          title={item}
          category={category}
          selectCategory={selectCategory}
        />
      ))}
    </ul>
  );
};
