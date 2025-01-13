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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PerformanceMetricsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PerformanceMetrics'>;
};

type TimeRange = '7d' | '30d' | '90d' | '1y';

type Metric = {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
};

type ChartData = {
  labels: string[];
  datasets: {
    data: number[];
  }[];
};

export default function PerformanceMetricsScreen({ navigation }: PerformanceMetricsScreenProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('team_growth');

  const metrics: Metric[] = [
    {
      id: 'team_growth',
      title: 'Team Growth',
      value: 24,
      change: 15.8,
      trend: 'up',
      icon: 'people',
    },
    {
      id: 'sales_performance',
      title: 'Sales Performance',
      value: 85000,
      change: 8.3,
      trend: 'up',
      icon: 'cash',
    },
    {
      id: 'debicheck_rate',
      title: 'DebiCheck Success Rate',
      value: 92,
      change: -2.5,
      trend: 'down',
      icon: 'checkmark-circle',
    },
    {
      id: 'active_members',
      title: 'Active Members',
      value: 18,
      change: 0,
      trend: 'stable',
      icon: 'person',
    },
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: 'Year' },
  ];

  const formatValue = (value: number, metricId: string) => {
    if (metricId === 'sales_performance') {
      return `R${value.toLocaleString()}`;
    }
    if (metricId === 'debicheck_rate') {
      return `${value}%`;
    }
    return value.toString();
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change}%`;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#F44336';
      default:
        return '#FFD700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'arrow-up';
      case 'down':
        return 'arrow-down';
      default:
        return 'remove';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timeRangeContainer}>
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range.value}
            style={[
              styles.timeRangeButton,
              timeRange === range.value && styles.selectedTimeRange,
            ]}
            onPress={() => setTimeRange(range.value as TimeRange)}
          >
            <Text
              style={[
                styles.timeRangeText,
                timeRange === range.value && styles.selectedTimeRangeText,
              ]}
            >
              {range.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <TouchableOpacity
            key={metric.id}
            style={[
              styles.metricCard,
              selectedMetric === metric.id && styles.selectedMetricCard,
            ]}
            onPress={() => setSelectedMetric(metric.id)}
          >
            <View style={styles.metricHeader}>
              <Ionicons name={metric.icon} size={24} color="#FFD700" />
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
            <Text style={styles.metricValue}>
              {formatValue(metric.value, metric.id)}
            </Text>
            <View style={styles.metricTrend}>
              <Ionicons
                name={getTrendIcon(metric.trend)}
                size={16}
                color={getTrendColor(metric.trend)}
              />
              <Text
                style={[
                  styles.metricChange,
                  { color: getTrendColor(metric.trend) },
                ]}
              >
                {formatChange(metric.change)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Performance Trend</Text>
        {/* Add chart component here */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart Visualization</Text>
        </View>
      </View>

      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>Key Insights</Text>
        <View style={styles.insightCard}>
          <Ionicons name="trending-up" size={24} color="#4CAF50" />
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>
              Team growth has increased by 15.8% in the last 30 days
            </Text>
          </View>
        </View>
        <View style={styles.insightCard}>
          <Ionicons name="alert-circle" size={24} color="#F44336" />
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>
              DebiCheck success rate needs attention, dropped by 2.5%
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#2A2E37',
  },
  selectedTimeRange: {
    backgroundColor: '#3A3E47',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  timeRangeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedTimeRangeText: {
    color: '#FFD700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    margin: '1%',
  },
  selectedMetricCard: {
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 14,
    marginLeft: 4,
  },
  chartContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#2A2E37',
  },
  chartTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  insightsContainer: {
    padding: 15,
  },
  insightsTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  insightContent: {
    flex: 1,
    marginLeft: 10,
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
}); 