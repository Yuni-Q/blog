import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPate] = useState(0);
  const [lastPage, setLastPage] = useState();

  const getDate = async () => {
    setIsLoading(true);
    const response = await fetch(`${USERS_URL}?page=${page}`);
    const jsonData = await response.json();
    const pageCount = jsonData.count;
    const results = jsonData.results;

    const isZero = pageCount % 10;
    const lastPage = pageCount
      ? Math.floor(pageCount / 10) - (isZero ? 0 : 1)
      : 0;
    setLastPage(lastPage);

    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    getDate();
  }, [page]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          disabled={isLoading || page === 0}
          onClick={() => {
            setPate(0);
          }}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          disabled={isLoading || page === 0}
          onClick={() => {
            setPate(page - 1);
          }}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          disabled={isLoading || page === lastPage}
          onClick={() => {
            setPate(page + 1);
          }}
        >
          next
        </button>
        <button
          className="last-page-btn"
          disabled={isLoading || page === lastPage}
          onClick={() => {
            setPate(lastPage);
          }}
        >
          last
        </button>
      </section>
    </div>
  );
}
