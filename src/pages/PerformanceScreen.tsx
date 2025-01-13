import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

type MetricType = {
  id: string;
  label: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
};

type TimeRange = 'day' | 'week' | 'month' | 'year';

export default function PerformanceScreen() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('month');
  const [metrics] = useState<MetricType[]>([
    {
      id: '1',
      label: 'Total Invites',
      value: 145,
      target: 200,
      trend: 'up',
      percentage: 72.5,
    },
    {
      id: '2',
      label: 'Presentations',
      value: 48,
      target: 60,
      trend: 'up',
      percentage: 80,
    },
    {
      id: '3',
      label: 'Sign-ups',
      value: 35,
      target: 40,
      trend: 'stable',
      percentage: 87.5,
    },
    {
      id: '4',
      label: 'Team Growth',
      value: 12,
      target: 15,
      trend: 'down',
      percentage: 80,
    },
  ]);

  const getTrendColor = (trend: MetricType['trend']) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#F44336';
      case 'stable':
        return '#FFD700';
    }
  };

  const getTrendIcon = (trend: MetricType['trend']) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'remove';
    }
  };

  const renderMetricCard = (metric: MetricType) => (
    <View key={metric.id} style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{metric.label}</Text>
        <View style={[styles.trendBadge, { backgroundColor: `${getTrendColor(metric.trend)}20` }]}>
          <Ionicons
            name={getTrendIcon(metric.trend)}
            size={16}
            color={getTrendColor(metric.trend)}
          />
        </View>
      </View>
      
      <View style={styles.metricContent}>
        <View style={styles.metricValues}>
          <Text style={styles.metricValue}>{metric.value}</Text>
          <Text style={styles.metricTarget}>/ {metric.target}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${metric.percentage}%`, backgroundColor: getTrendColor(metric.trend) },
            ]}
          />
        </View>
        <Text style={styles.metricPercentage}>{metric.percentage}%</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Metrics</Text>
        <View style={styles.timeRangeContainer}>
          {(['day', 'week', 'month', 'year'] as TimeRange[]).map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                selectedRange === range && styles.timeRangeButtonActive,
              ]}
              onPress={() => setSelectedRange(range)}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  selectedRange === range && styles.timeRangeTextActive,
                ]}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.metricsGrid}>
          {metrics.map(renderMetricCard)}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity Timeline</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFD700" />
            </TouchableOpacity>
          </View>
          {/* Activity Timeline placeholder */}
          <View style={styles.timelinePlaceholder}>
            <Text style={styles.placeholderText}>Activity Timeline Coming Soon</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Insights</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFD700" />
            </TouchableOpacity>
          </View>
          {/* Insights placeholder */}
          <View style={styles.insightsPlaceholder}>
            <Text style={styles.placeholderText}>Performance Insights Coming Soon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2E37',
  },
  timeRangeButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  timeRangeText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#FFD700',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  metricsGrid: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  metricCard: {
    flex: isLargeScreen ? 1 : undefined,
    minWidth: isLargeScreen ? (width - 60) / 2 : '100%',
    backgroundColor: '#2A2E37',
    borderRadius: 15,
    padding: 15,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  trendBadge: {
    padding: 6,
    borderRadius: 8,
  },
  metricContent: {
    gap: 10,
  },
  metricValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricTarget: {
    color: '#666',
    fontSize: 16,
    marginLeft: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  metricPercentage: {
    color: '#666',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewAllText: {
    color: '#FFD700',
    fontSize: 14,
  },
  timelinePlaceholder: {
    backgroundColor: '#2A2E37',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  insightsPlaceholder: {
    backgroundColor: '#2A2E37',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
}); 