import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import Svg, { Circle } from 'react-native-svg';
import { BottomNavigation } from '../components/BottomNavigation';
import { theme } from '../styles/theme';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

type ActivityItem = {
  id: string;
  type: 'presentation' | 'signup' | 'meeting';
  user: string;
  description: string;
  timeAgo: string;
};

type TeamMember = {
  id: string;
  name: string;
  level: number;
  rating: number;
};

export default function AdminDashboardScreen({ navigation }: AdminDashboardScreenProps) {
  const { logout } = useAuth();
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'presentation',
      user: 'John Doe',
      description: 'completed a presentation',
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      type: 'signup',
      user: 'Jane Smith',
      description: 'signed up a new client',
      timeAgo: '4 hours ago'
    },
    {
      id: '3',
      type: 'meeting',
      user: 'Team',
      description: 'meeting scheduled for tomorrow',
      timeAgo: '6 hours ago'
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alice Johnson', level: 5, rating: 4 },
    { id: '2', name: 'Bob Smith', level: 4, rating: 3 },
    { id: '3', name: 'Charlie Brown', level: 3, rating: 5 }
  ]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const renderProgressCircle = (value: number, total: number, label: string) => {
    const radius = isLargeScreen ? 45 : 50;
    const strokeWidth = isLargeScreen ? 10 : 12;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = 1 - (value / total);
    const strokeDashoffset = progress * circumference;
    const percentage = Math.round((value / total) * 100);

    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressCircle, !isLargeScreen && styles.progressCircleMobile]}>
          <Svg height={radius * 2} width={radius * 2}>
            <Circle
              stroke="rgba(42, 46, 55, 0.8)"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <Circle
              stroke="#FFD700"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90 ${radius} ${radius})`}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.progressTextContainer}>
            <Text style={[styles.progressValue, !isLargeScreen && styles.progressValueMobile]}>{percentage}%</Text>
            <Text style={[styles.progressFraction, !isLargeScreen && styles.progressFractionMobile]}>{value}/{total}</Text>
          </View>
        </View>
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
    );
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'presentation':
        return '🎯';
      case 'signup':
        return '🤝';
      case 'meeting':
        return '📅';
      default:
        return '📝';
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Text key={index} style={styles.star}>
        {index < rating ? '★' : '☆'}
      </Text>
    ));
  };

  const navigationItems = [
    {
      name: 'Home',
      icon: 'grid-outline',
      onPress: () => handleNavigation('AdminDashboard'),
      isActive: true,
    },
    {
      name: 'Invite',
      icon: 'person-add-outline',
      onPress: () => handleNavigation('Invite'),
    },
    {
      name: 'Team',
      icon: 'people-outline',
      onPress: () => handleNavigation('Team'),
    },
    {
      name: 'Stats',
      icon: 'stats-chart',
      onPress: () => handleNavigation('Performance'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleNavigation('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleNavigation('Profile')}
          >
            <Ionicons name="person-outline" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.navigationBar}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation('AdminDashboard')}
          >
            <Ionicons name="home-outline" size={20} color="#FFD700" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation('Performance')}
          >
            <Ionicons name="stats-chart-outline" size={24} color="#FFD700" />
            <Text style={styles.navText}>Performance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation('Team')}
          >
            <Ionicons name="people-outline" size={24} color="#FFD700" />
            <Text style={styles.navText}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
            <Text style={styles.navText}>Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Performance Summary</Text>
            <TouchableOpacity onPress={() => handleNavigation('Performance')}>
              <Text style={styles.viewMore}>View Details</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.progressRowContainer}
          >
            <View style={styles.progressRow}>
              {renderProgressCircle(4, 5, 'Daily Target')}
              {renderProgressCircle(3, 5, 'Weekly Target')}
              {renderProgressCircle(4, 5, 'Monthly Target')}
            </View>
          </ScrollView>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>12</Text>
            <Text style={styles.statsTitle}>Pending Invites</Text>
            <View style={styles.statsIcon}>
              <Ionicons name="people-outline" size={24} color="#FFD700" />
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>5</Text>
            <Text style={styles.statsTitle}>Today's Presentations</Text>
            <View style={styles.statsIcon}>
              <Ionicons name="calendar-outline" size={24} color="#FFD700" />
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>24</Text>
            <Text style={styles.statsTitle}>Recent Signups</Text>
            <View style={styles.statsIcon}>
              <Ionicons name="person-add-outline" size={24} color="#FFD700" />
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>8</Text>
            <Text style={styles.statsTitle}>Follow-ups Needed</Text>
            <View style={styles.statsIcon}>
              <Ionicons name="call-outline" size={24} color="#FFD700" />
            </View>
          </View>
        </View>

        <View style={styles.splitSection}>
          <View style={[styles.card, styles.timelineCard]}>
            <Text style={styles.cardTitle}>Activity Timeline</Text>
            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityUser}>{activity.user}</Text> {activity.description}
                  </Text>
                  <Text style={styles.activityTime}>{activity.timeAgo}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.card, styles.teamCard]}>
            <Text style={styles.cardTitle}>Team Overview</Text>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.teamMember}>
                <View>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberLevel}>Level {member.level}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  {renderStars(member.rating)}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation items={navigationItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
    paddingBottom: isLargeScreen ? 0 : 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 15,
    backgroundColor: '#1B1F24',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconContainer: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingBottom: isLargeScreen ? 20 : 90,
  },
  navigationBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#2A2E37',
    marginBottom: 20,
    display: isLargeScreen ? 'flex' : 'none'
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  navText: {
    color: '#FFD700',
    marginLeft: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#2A2E37',
    borderRadius: 20,
    padding: 24,
    margin: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: isLargeScreen ? 'space-between' : 'flex-start',
    alignItems: isLargeScreen ? 'center' : 'flex-start',
    marginBottom: isLargeScreen ? 30 : 20,
    gap: isLargeScreen ? 0 : 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  viewMore: {
    color: '#FFD700',
    fontSize: 14,
    opacity: 0.8,
    paddingVertical: isLargeScreen ? 0 : 5,
  },
  progressRowContainer: {
    paddingHorizontal: isLargeScreen ? 10 : 5,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isLargeScreen ? 40 : 30,
    paddingVertical: isLargeScreen ? 10 : 15,
  },
  progressContainer: {
    alignItems: 'center',
    minWidth: isLargeScreen ? 130 : 150,
    paddingHorizontal: isLargeScreen ? 10 : 15,
  },
  progressCircle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(42, 46, 55, 0.5)',
    borderRadius: 100,
    padding: isLargeScreen ? 10 : 12,
  },
  progressCircleMobile: {
    padding: 15,
    marginBottom: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  progressValue: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressValueMobile: {
    fontSize: 26,
    marginBottom: 4,
  },
  progressFraction: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  progressFractionMobile: {
    fontSize: 14,
  },
  progressLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    gap: 20,
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: '#2A2E37',
    borderRadius: 20,
    padding: 24,
    width: isLargeScreen ? `${(100 - 3 * 2.5) / 4}%` : '46%',
    minHeight: 120,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  statsTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 8,
    opacity: 0.85,
    letterSpacing: 0.3,
  },
  statsValue: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 215, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statsIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.9,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 8,
    borderRadius: 12,
  },
  splitSection: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    padding: 15,
    gap: 15,
    marginBottom: isLargeScreen ? 0 : 50,
  },
  timelineCard: {
    flex: isLargeScreen ? 2 : 1,
    margin: 0,
  },
  teamCard: {
    flex: isLargeScreen ? 1 : 1,
    margin: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  activityUser: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  activityTime: {
    color: '#666666',
    fontSize: 12,
    marginTop: 4,
  },
  teamMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberLevel: {
    color: '#666666',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
  },
  notificationButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.status.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 