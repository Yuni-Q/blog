import React, { VFC } from 'react';

export const Connect: VFC = () => {
  return (
    <>
      <h3>Connect</h3>
      <div style={{ paddingLeft: 32, paddingRight: 32 }}>
        <table>
          <tbody>
            <tr>
              <th>GitHub</th>
              <td>
                <a
                  href="https://github.com/Yuni-Q"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/Yuni-Q
                </a>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <a href="mailto:lyh6425@gmail.com">lyh6425@gmail.com</a>
              </td>
            </tr>
            <tr>
              <th>LinkedIn</th>
              <td>
                <a
                  href="https://www.linkedin.com/in/yuni-q"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.linkedin.com/in/yuni-q
                </a>
              </td>
            </tr>
            <tr>
              <th>Blog</th>
              <td>
                <a
                  href="https://yuni-q.github.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://yuni-q.github.io/
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
