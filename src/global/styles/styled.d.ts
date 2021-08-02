import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeColors = typeof theme;

  export interface DefaultTheme extends ThemeColors {}
}
