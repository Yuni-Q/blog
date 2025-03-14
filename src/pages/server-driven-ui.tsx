import React from 'react';

const ServerDrivenUI = () => {
  const data = [
    {
      type: 'search',
      data: {
        placeholder: '검색어를 입력하세요',
      },
    },
    {
      type: 'table',
      data: {
        header: ['이름', '나이'],
        body: [
          { name: '김철수', age: 30 },
          { name: '홍길동', age: 40 },
        ],
      },
    },
  ];
  const getComponent = (type: string, data: any) => {
    switch (type) {
      case 'search':
        return <SearchForm {...data} />;
      case 'table':
        return <Table {...data} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Server Driven UI</h1>
      {data.map(({ type, data }, index) => (
        <div key={index}>{getComponent(type, data)}</div>
      ))}
    </div>
  );
};

export default ServerDrivenUI;

const Table = (data) => {
  return (
    <table>
      <thead>
        <tr>
          {data.header.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.body.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SearchForm = (data) => {
  return (
    <form>
      <input type="text" placeholder={data.placeholder} />
      <button type="submit">검색</button>
    </form>
  );
};
