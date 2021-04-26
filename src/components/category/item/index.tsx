import React from 'react';
import sendGAEvent, { GA_ACTION } from '../../../utils/ga';

export const Item = ({ title, category, selectCategory }) => (
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
      {title}
    </div>
  </li>
);
