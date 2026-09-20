'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brand } from '@/lib/brand';

const theme = createTheme({
  palette: {
    primary: {
      main: brand.accentBlue,
      light: brand.accentBlueLight,
      dark: brand.accentBlueDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: brand.graphiteBlack,
      contrastText: '#ffffff',
    },
    error: { main: '#b42318' },
    success: { main: '#1f7a4d' },
    warning: { main: '#b54708' },
    info: { main: brand.accentBlueDark },
    text: {
      primary: brand.graphiteBlack,
      secondary: '#5c6068',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    divider: '#e2e5e8',
  },
  typography: {
    fontFamily: [
      'var(--font-geist-sans)',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.35 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 2px rgba(30, 32, 35, 0.06)',
    '0 1px 2px rgba(30, 32, 35, 0.08), 0 4px 12px rgba(30, 32, 35, 0.06)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
    '0 4px 8px rgba(30, 32, 35, 0.08), 0 16px 32px rgba(30, 32, 35, 0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          minHeight: 44,
          paddingLeft: 20,
          paddingRight: 20,
        },
        sizeLarge: {
          minHeight: 48,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'var(--shadow-sm)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 48,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
