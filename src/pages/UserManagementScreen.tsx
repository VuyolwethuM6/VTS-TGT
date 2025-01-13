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

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
};

const UserManagementScreen = () => {
  const [users, setUsers] = useState<UserType[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Team Lead', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Member', status: 'inactive' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    // Navigate to add user form
  };

  const handleEditUser = (user: UserType) => {
    // Navigate to edit user form
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
          <Ionicons name="add" size={24} color="#FFD700" />
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.userList}>
        {filteredUsers.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.userMeta}>
                  <Text style={styles.userRole}>{user.role}</Text>
                  <View style={[
                    styles.statusBadge,
                    user.status === 'active' ? styles.statusActive : styles.statusInactive
                  ]}>
                    <Text style={styles.statusText}>{user.status}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEditUser(user)}
              >
                <Ionicons name="create-outline" size={20} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleToggleStatus(user.id)}
              >
                <Ionicons 
                  name={user.status === 'active' ? "close-circle-outline" : "checkmark-circle-outline"} 
                  size={20} 
                  color={user.status === 'active' ? "#F44336" : "#4CAF50"} 
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchContainer: {
    flex: 1,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2E37',
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  addButtonText: {
    color: '#FFD700',
    fontWeight: '500',
  },
  userList: {
    flex: 1,
    padding: 15,
  },
  userCard: {
    backgroundColor: '#2A2E37',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userRole: {
    color: '#FFD700',
    fontSize: 12,
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statusInactive: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  statusText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(42, 46, 55, 0.8)',
  },
}); 