---
title: find text
date: 2021-03-13 21:03:44
category: frontend
tags: []
draft: true
---

```ts
export const getFindStringInfos = (
  str: string,
  value: string,
): IFindStringInfo[] => {
  if (!str) {
    return [{ isMatch: false, text: str }];
  }
  const findIndex = str.indexOf(value);
  const startIndexOfNextTextOfFindText = findIndex + value.length;
  const candidates = [];
  if (findIndex === -1) {
    return [{ isMatch: false, text: str }];
  }
  let text = str;
  do {
    const findIndex = text.indexOf(value);
    if (findIndex !== 0) {
      candidates.push({ isMatch: false, text: text.substring(0, findIndex) });
    }
    candidates.push({ isMatch: true, text: value });
    text = text.slice(findIndex + value.length);
  } while (text.indexOf(value) !== -1);
  if (startIndexOfNextTextOfFindText !== str.length) {
    candidates.push({ isMatch: false, text: text });
  }

  return candidates;
};
```

```tsx
return (
  <>
    {findStringInfos.map((item, index) => {
      const { text, isMatch } = item;
      return isMatch === true ? (
        <BlueBoldSpan key={text + index}>{text}</BlueBoldSpan>
      ) : (
        <span key={text}>{text}</span>
      );
    })}
  </>
);
```
