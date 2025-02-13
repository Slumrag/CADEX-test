import { createContext, useContext } from 'react';

export type ColorScheme = 'light' | 'dark';

export const ColorSchemeContext = createContext<ColorScheme>('light');

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}
