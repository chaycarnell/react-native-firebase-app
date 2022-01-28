import React from 'react';
import Styled from 'styled-components/native';
import { s } from '@utils/scale';

interface ISpacerProps {
  height: number;
  width: number;
}

const Spacer = Styled.View<ISpacerProps>`
   opacity: 0;
   height: ${({ height }) => `${s(height)}px`};
   width: ${({ width }) => `${s(width)}px`};
`;

const Render = ({ height = 0, width = 0 }) => (
  <Spacer height={height} width={width} />
);

export default Render;
