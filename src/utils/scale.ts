import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

/**
 * Baseline scale ratio device dimensions
 * Iphone SE 1st Generation (Smallest targeted device)
 */
const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number): number =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (
  size: number,
  factor: number = 0.5,
): number => size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
