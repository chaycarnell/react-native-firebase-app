export type CapitalizeType =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters'
  | undefined;

export type TextAlignType = 'left' | 'center' | 'right' | undefined;

export interface CustomTextInput {
  value: string;
  placeholder?: string;
  isSecure?: boolean;
  autoCapitalize?: CapitalizeType;
  textAlign?: TextAlignType;
  onChange?: (text: string) => void;
}
