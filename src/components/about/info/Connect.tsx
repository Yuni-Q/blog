import React from 'react';
import { A, Div, H3, TBody, Table, Td, Th, Tr } from '../../../pages/about';

export const Connect = () => {
  return (
    <>
      <H3>Connect</H3>
      <Div style={{ paddingLeft: 32, paddingRight: 32 }}>
        <Table>
          <TBody>
            <Tr>
              <Th>GiThub</Th>
              <Td>
                <A
                  href="https://giThub.com/Yuni-Q"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://giThub.com/Yuni-Q
                </A>
              </Td>
            </Tr>
            <Tr>
              <Th>Email</Th>
              <Td>
                <A href="mailto:lyh6425@gmail.com">lyh6425@gmail.com</A>
              </Td>
            </Tr>
            <Tr>
              <Th>LinkedIn</Th>
              <Td>
                <A
                  href="https://www.linkedin.com/in/yuni-q"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.linkedin.com/in/yuni-q
                </A>
              </Td>
            </Tr>
            <Tr>
              <Th>Blog</Th>
              <Td>
                <A
                  href="https://yuni-q.giThub.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://yuni-q.giThub.io/
                </A>
              </Td>
            </Tr>
          </TBody>
        </Table>
      </Div>
    </>
  );
};
