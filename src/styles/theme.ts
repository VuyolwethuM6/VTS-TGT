import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#FFD700',
    secondary: '#000000', // Black
    background: {
      primary: '#1B1F24',
      secondary: '#2A2E37',
      card: '#2A2E37',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      muted: '#666666',
    },
    status: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3',
    },
    gradient: {
      start: '#2A2E37',
      end: '#1B1F24',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    circle: 9999,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  layout: {
    containerPadding: 20,
    maxContentWidth: 1200,
    headerHeight: 60,
    bottomNavHeight: 60,
  },
  breakpoints: {
    tablet: 768,
    desktop: 1024,
  },
}; 