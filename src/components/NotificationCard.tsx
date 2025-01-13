import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

type NotificationType = 'achievement' | 'alert' | 'update' | 'reminder';

type NotificationCardProps = {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

const notificationConfig = {
  achievement: {
    icon: 'trophy-outline',
    gradient: ['#FFD700', '#FDB931'],
  },
  alert: {
    icon: 'warning-outline',
    gradient: ['#FF3B30', '#FF453A'],
  },
  update: {
    icon: 'refresh-outline',
    gradient: ['#4169E1', '#324AB2'],
  },
  reminder: {
    icon: 'alarm-outline',
    gradient: ['#34C759', '#2A9D48'],
  },
};

export function NotificationCard({
  type,
  title,
  message,
  timestamp,
  read = false,
  onPress,
  style,
}: NotificationCardProps) {
  const config = notificationConfig[type];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        read && styles.readContainer,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={config.gradient}
          style={styles.iconGradient}
        >
          <Ionicons
            name={config.icon as any}
            size={24}
            color="#FFFFFF"
          />
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {!read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.text.muted}
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.card,
  },
  readContainer: {
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    ...theme.typography.subtitle1,
    color: theme.colors.text.primary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  timestamp: {
    ...theme.typography.caption,
    color: theme.colors.text.muted,
  },
  chevron: {
    marginLeft: theme.spacing.sm,
  },
}); 