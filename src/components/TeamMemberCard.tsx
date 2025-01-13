import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from './Badge';
import { theme } from '../styles/theme';

type TeamMemberStatus = 'active' | 'pending' | 'inactive';

type TeamMemberCardProps = {
  name: string;
  role: string;
  status: TeamMemberStatus;
  performance: {
    invites: number;
    presentations: number;
    recruits: number;
  };
  rating: number;
  onPress?: () => void;
  style?: ViewStyle;
};

const statusConfig = {
  active: {
    text: 'Active',
    variant: 'success' as const,
  },
  pending: {
    text: 'Pending',
    variant: 'warning' as const,
  },
  inactive: {
    text: 'Inactive',
    variant: 'error' as const,
  },
};

export function TeamMemberCard({
  name,
  role,
  status,
  performance,
  rating,
  onPress,
  style,
}: TeamMemberCardProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons
            key={i}
            name="star"
            size={16}
            color={theme.colors.primary}
            style={styles.star}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons
            key={i}
            name="star-half"
            size={16}
            color={theme.colors.primary}
            style={styles.star}
          />
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={16}
            color={theme.colors.primary}
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={[theme.colors.background.card, 'rgba(255, 215, 0, 0.05)']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
          <Badge
            text={statusConfig[status].text}
            variant={statusConfig[status].variant}
            size="small"
          />
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{performance.invites}</Text>
            <Text style={styles.statLabel}>Invites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{performance.presentations}</Text>
            <Text style={styles.statLabel}>Presentations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{performance.recruits}</Text>
            <Text style={styles.statLabel}>Recruits</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            {renderStars()}
          </View>
          {onPress && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.muted}
            />
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
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  role: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
}); 