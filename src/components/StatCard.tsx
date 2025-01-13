import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  style?: ViewStyle;
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  style,
}: StatCardProps) {
  return (
    <LinearGradient
      colors={[theme.colors.background.card, 'rgba(255, 215, 0, 0.05)']}
      style={[styles.container, style]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={theme.colors.primary}
          />
        )}
      </View>
      
      <Text style={styles.value}>{value}</Text>
      
      {trend && (
        <View style={styles.trendContainer}>
          <Ionicons
            name={trend.isPositive ? 'trending-up' : 'trending-down'}
            size={16}
            color={trend.isPositive ? '#34C759' : '#FF3B30'}
            style={styles.trendIcon}
          />
          <Text
            style={[
              styles.trendValue,
              { color: trend.isPositive ? '#34C759' : '#FF3B30' },
            ]}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.card,
    ...theme.shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.subtitle2,
    color: theme.colors.text.secondary,
  },
  value: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: theme.spacing.xs,
  },
  trendValue: {
    ...theme.typography.caption,
    fontWeight: 'bold',
  },
}); 