import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileMetricsProps {
  metrics: {
    totalInvites: number;
    totalPresentations: number;
    totalRecruits: number;
    currentLevel: number;
  };
}

export default function ProfileMetrics({ metrics }: ProfileMetricsProps) {
  const { colors } = useTheme();

  const MetricItem = ({ icon, label, value }: { icon: string; label: string; value: number }) => (
    <View style={styles.metricItem}>
      <MaterialIcons name={icon as any} size={24} color={colors.primary} />
      <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Performance Metrics</Text>
      <View style={styles.metricsGrid}>
        <MetricItem
          icon="people"
          label="Total Invites"
          value={metrics.totalInvites}
        />
        <MetricItem
          icon="presentation"
          label="Presentations"
          value={metrics.totalPresentations}
        />
        <MetricItem
          icon="group-add"
          label="Recruits"
          value={metrics.totalRecruits}
        />
        <MetricItem
          icon="star"
          label="Current Level"
          value={metrics.currentLevel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 