import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from './CircularProgress';
import { theme } from '../styles/theme';

type ActivityType = 'invites' | 'presentations' | 'recruits';

type ActivityCardProps = {
  type: ActivityType;
  current: number;
  target: number;
  onPress?: () => void;
  style?: ViewStyle;
};

const activityConfig = {
  invites: {
    icon: 'people-outline',
    title: 'Invites',
    gradient: ['#FFD700', '#FDB931'],
  },
  presentations: {
    icon: 'easel-outline',
    title: 'Presentations',
    gradient: ['#4169E1', '#324AB2'],
  },
  recruits: {
    icon: 'person-add-outline',
    title: 'Recruits',
    gradient: ['#34C759', '#2A9D48'],
  },
};

export function ActivityCard({
  type,
  current,
  target,
  onPress,
  style,
}: ActivityCardProps) {
  const config = activityConfig[type];
  const progress = (current / target) * 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={config.gradient}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons
              name={config.icon as any}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.title}>{config.title}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.progressContainer}>
              <CircularProgress
                progress={progress}
                size="small"
                variant={type === 'invites' ? 'primary' : type === 'presentations' ? 'warning' : 'success'}
                showValue={false}
              />
            </View>
            <View style={styles.numbers}>
              <Text style={styles.current}>{current}</Text>
              <Text style={styles.target}>/ {target}</Text>
            </View>
          </View>

          {onPress && (
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Log Activity</Text>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  gradient: {
    width: '100%',
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: '#FFFFFF',
    marginLeft: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    marginRight: theme.spacing.md,
  },
  numbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  current: {
    ...theme.typography.h1,
    color: '#FFFFFF',
  },
  target: {
    ...theme.typography.subtitle1,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: theme.spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    ...theme.typography.button1,
    color: '#FFFFFF',
  },
  buttonIcon: {
    marginLeft: theme.spacing.xs,
  },
}); 