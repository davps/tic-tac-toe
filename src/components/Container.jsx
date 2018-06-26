import React from 'react';

import styled from 'styled-components';

export const Container = styled.span`
  font-size: 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

export const SpacedContainer = Container.extend`
  padding: 10px;
  padding-bottom: 15px;
`;
