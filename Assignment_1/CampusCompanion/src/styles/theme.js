import { Platform } from 'react-native';

export const colors = {
  primary: '#1A3C5E',
  primaryLight: '#B0C8E8',
  background: '#F4F6FA',
  surface: '#FFFFFF',
  textPrimary: '#1A3C5E',
  textSecondary: '#6B7A8D',
  border: '#E5EAF2',
};

// Platform.select used for font family – demonstrates platform-specific styles
export const typography = {
  heading: {
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    fontWeight: '800',
    color: colors.textPrimary,
  },
  body: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
    }),
    color: colors.textSecondary,
    fontSize: 14,
  },
};