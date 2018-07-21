import styled from 'styled-components';
import ACTOR from '../reducers/ACTOR';

/* eslint-disable react/destructuring-assignment */
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
  color: ${props => ACTOR.color[props.player]};
`;
/* eslint-enable */

export const SpacedContainer = Container.extend`
  padding: 10px;
  padding-bottom: 15px;
`;
