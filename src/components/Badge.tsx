import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'small' | 'medium';

type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
};

const variantColors = {
  success: {
    background: 'rgba(52, 199, 89, 0.1)',
    text: '#34C759',
  },
  warning: {
    background: 'rgba(255, 149, 0, 0.1)',
    text: '#FF9500',
  },
  error: {
    background: 'rgba(255, 59, 48, 0.1)',
    text: '#FF3B30',
  },
  info: {
    background: 'rgba(0, 122, 255, 0.1)',
    text: '#007AFF',
  },
};

export function Badge({
  text,
  variant = 'info',
  size = 'medium',
  style,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.container,
        styles[size],
        { backgroundColor: variantColors[variant].background },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          { color: variantColors[variant].text },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: theme.spacing.xs,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.sm,
  },
  text: {
    textAlign: 'center',
  },
  smallText: {
    ...theme.typography.caption,
    fontSize: 10,
  },
  mediumText: {
    ...theme.typography.caption,
  },
}); 