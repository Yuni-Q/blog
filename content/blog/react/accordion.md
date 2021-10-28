---
title: Accordion
date: 2021-10-28 22:10:59
category: react
tags: []
draft: true
---

```tsx
import React, { FC, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';

import Title from 'components/molecules/title/Title';

import Icon from '../icon/Icon';

interface Props {
  title: ReactNode;
}

export const Accordion: FC<Props> = ({ title, children }) => {
  const [height, setHeight] = useState(0);
  const scrollTarget = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Title
        className="px-3"
        rightArea={
          <Icon
            name={height > 0 ? 'iconArrowExpandLess' : 'iconArrowExpandMore'}
            strokeColor="gray3"
          />
        }
        onClick={() => {
          setHeight((prevHeight) =>
            prevHeight > 0 ? 0 : scrollTarget.current?.scrollHeight || 0,
          );
        }}
      >
        {title}
      </Title>
      <Body ref={scrollTarget} height={height}>
        {children}
      </Body>
    </div>
  );
};

const Body = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  transition: all 0.2s linear;
  padding: 0 15px;
  border-top: ${({ height }) => (height > 0 ? '1px solid #e6e6e6' : '0')};
  overflow: hidden;
`;
```
