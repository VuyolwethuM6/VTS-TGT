import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: '1',
      title: 'New Team Member',
      message: 'John Doe has joined your team',
      type: 'info',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Target Achieved',
      message: 'Your team has achieved the monthly target',
      type: 'success',
      timestamp: '5 hours ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Pending Approval',
      message: 'New member registration requires your approval',
      type: 'warning',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      title: 'System Update',
      message: 'New features have been added to the platform',
      type: 'info',
      timestamp: '2 days ago',
      isRead: true,
    },
  ]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getIconName = (type: NotificationType['type']) => {
    switch (type) {
      case 'info':
        return 'information-circle';
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'alert-circle';
      default:
        return 'information-circle';
    }
  };

  const getIconColor = (type: NotificationType['type']) => {
    switch (type) {
      case 'info':
        return '#3498db';
      case 'success':
        return '#2ecc71';
      case 'warning':
        return '#f1c40f';
      case 'error':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.notificationList}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={48} color="#666" />
            <Text style={styles.emptyStateText}>No notifications</Text>
          </View>
        ) : (
          notifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.isRead && styles.notificationCardRead
              ]}
              onPress={() => handleMarkAsRead(notification.id)}
            >
              <View style={styles.notificationIcon}>
                <Ionicons
                  name={getIconName(notification.type)}
                  size={24}
                  color={getIconColor(notification.type)}
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.timestamp}</Text>
              </View>
              {!notification.isRead && (
                <View style={styles.unreadIndicator} />
              )}
            </TouchableOpacity>
          ))
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  clearButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationList: {
    flex: 1,
    padding: 15,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#2A2E37',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  notificationCardRead: {
    opacity: 0.7,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginLeft: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
}); 