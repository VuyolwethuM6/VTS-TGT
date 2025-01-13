import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '../styles/theme';

type CircularProgressVariant = 'primary' | 'success' | 'warning' | 'error';
type CircularProgressSize = 'small' | 'medium' | 'large';

type CircularProgressProps = {
  progress: number; // 0 to 100
  variant?: CircularProgressVariant;
  size?: CircularProgressSize;
  showValue?: boolean;
  style?: ViewStyle;
};

const variantColors = {
  primary: theme.colors.primary,
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

const sizeConfig = {
  small: {
    size: 60,
    strokeWidth: 4,
    fontSize: 14,
  },
  medium: {
    size: 100,
    strokeWidth: 6,
    fontSize: 20,
  },
  large: {
    size: 150,
    strokeWidth: 8,
    fontSize: 28,
  },
};

export function CircularProgress({
  progress,
  variant = 'primary',
  size = 'medium',
  showValue = true,
  style,
}: CircularProgressProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const config = sizeConfig[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[styles.container, style]}>
      <Svg width={config.size} height={config.size}>
        {/* Background Circle */}
        <Circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          stroke={theme.colors.background.card}
          strokeWidth={config.strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${config.size / 2} ${config.size / 2})`}
        />
      </Svg>
      {showValue && (
        <View style={styles.valueContainer}>
          <Text style={[
            styles.value,
            { fontSize: config.fontSize, color: variantColors[variant] },
          ]}>
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontWeight: 'bold',
  },
}); 