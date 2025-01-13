import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error';
type ProgressBarSize = 'small' | 'medium' | 'large';

type ProgressBarProps = {
  progress: number; // 0 to 100
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  style?: ViewStyle;
};

const variantColors = {
  primary: [theme.colors.gradient.start, theme.colors.gradient.end],
  success: ['#34C759', '#32D74B'],
  warning: ['#FF9500', '#FFB340'],
  error: ['#FF3B30', '#FF453A'],
};

const sizeHeight = {
  small: 4,
  medium: 8,
  large: 12,
};

export function ProgressBar({
  progress,
  variant = 'primary',
  size = 'medium',
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View
      style={[
        styles.container,
        { height: sizeHeight[size] },
        style,
      ]}
    >
      <LinearGradient
        colors={variantColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.progress,
          { width: `${clampedProgress}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
}); 