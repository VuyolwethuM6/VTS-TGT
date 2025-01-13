import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TeamMemberType = {
  id: string;
  name: string;
  role: string;
  performance: {
    invites: number;
    presentations: number;
    signUps: number;
  };
  status: 'active' | 'inactive';
  lastActive: string;
};

export default function TeamScreen() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Team Lead',
      performance: {
        invites: 45,
        presentations: 20,
        signUps: 15,
      },
      status: 'active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Senior Member',
      performance: {
        invites: 38,
        presentations: 18,
        signUps: 12,
      },
      status: 'active',
      lastActive: '1 hour ago',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      role: 'Member',
      performance: {
        invites: 25,
        presentations: 10,
        signUps: 8,
      },
      status: 'inactive',
      lastActive: '3 days ago',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || member.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderPerformanceMetric = (label: string, value: number) => (
    <View style={styles.metricContainer}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search team members..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'active', 'inactive'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.filterButtonTextActive,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.memberList}>
        {filteredMembers.map(member => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <View style={styles.memberInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusDot,
                      member.status === 'active' ? styles.statusActive : styles.statusInactive
                    ]} />
                    <Text style={styles.lastActive}>Last active {member.lastActive}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.performanceContainer}>
              {renderPerformanceMetric('Invites', member.performance.invites)}
              {renderPerformanceMetric('Presentations', member.performance.presentations)}
              {renderPerformanceMetric('Sign-ups', member.performance.signUps)}
            </View>

            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFD700" />
            </TouchableOpacity>
          </View>
        ))}
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2E37',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFD700',
  },
  memberList: {
    flex: 1,
    padding: 15,
  },
  memberCard: {
    backgroundColor: '#2A2E37',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    color: '#FFD700',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#F44336',
  },
  lastActive: {
    color: '#666',
    fontSize: 12,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(42, 46, 55, 0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  metricContainer: {
    alignItems: 'center',
  },
  metricLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  viewDetailsText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
}); 