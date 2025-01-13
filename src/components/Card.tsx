import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
};

export function Card({ children, style, gradient = true }: CardProps) {
  if (gradient) {
    return (
      <View style={[styles.cardContainer, style]}>
        <LinearGradient
          colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
          style={styles.gradient}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.cardContainer, styles.solidCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  gradient: {
    padding: theme.spacing.lg,
  },
  solidCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.card,
  },
}); 