import { s } from '@utils/scale';

import { SpacerProps } from './spacer.types';

export const spacerStyles = ({ height, width }: SpacerProps) => ({
  opacity: 0,
  height: height ? s(height) : 0,
  width: width ? s(width) : 0,
});
