import React from 'react';
import { CATEGORY_TYPE } from '../../../constants/enum';
import sendGAEvent, { GA_ACTION } from '../../../utils/ga';
import { Category } from '../index';

export const Item = ({ title, category, selectCategory, posts = [] }) => {
  const count = posts.reduce((prev, curr) => {
    if (curr.node.frontmatter.category === title) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return (
    <li
      className="item"
      role="tab"
      aria-selected={category === title ? 'true' : 'false'}
    >
      <div
        className={title}
        onClick={() => {
          sendGAEvent('category', GA_ACTION.CLICK, title);
          selectCategory(title);
        }}
      >
        {title} / {title === CATEGORY_TYPE.ALL ? posts.length : count}
      </div>
    </li>
  );
};
