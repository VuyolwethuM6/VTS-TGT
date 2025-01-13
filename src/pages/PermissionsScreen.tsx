import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PermissionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Permissions'>;
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
};

type Permission = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export default function PermissionsScreen({ navigation }: PermissionsScreenProps) {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: [
        {
          id: 'user_management',
          name: 'User Management',
          description: 'Create, edit, and delete users',
          enabled: true,
        },
        {
          id: 'team_management',
          name: 'Team Management',
          description: 'Manage team structure and assignments',
          enabled: true,
        },
        {
          id: 'target_setting',
          name: 'Target Setting',
          description: 'Set and modify team targets',
          enabled: true,
        },
        {
          id: 'performance_metrics',
          name: 'Performance Metrics',
          description: 'View and analyze performance data',
          enabled: true,
        },
      ],
    },
    {
      id: '2',
      name: 'Team Leader',
      description: 'Team management and reporting',
      permissions: [
        {
          id: 'user_management',
          name: 'User Management',
          description: 'Create, edit, and delete users',
          enabled: false,
        },
        {
          id: 'team_management',
          name: 'Team Management',
          description: 'Manage team structure and assignments',
          enabled: true,
        },
        {
          id: 'target_setting',
          name: 'Target Setting',
          description: 'Set and modify team targets',
          enabled: true,
        },
        {
          id: 'performance_metrics',
          name: 'Performance Metrics',
          description: 'View and analyze performance data',
          enabled: true,
        },
      ],
    },
    {
      id: '3',
      name: 'Team Member',
      description: 'Basic access and personal metrics',
      permissions: [
        {
          id: 'user_management',
          name: 'User Management',
          description: 'Create, edit, and delete users',
          enabled: false,
        },
        {
          id: 'team_management',
          name: 'Team Management',
          description: 'Manage team structure and assignments',
          enabled: false,
        },
        {
          id: 'target_setting',
          name: 'Target Setting',
          description: 'Set and modify team targets',
          enabled: false,
        },
        {
          id: 'performance_metrics',
          name: 'Performance Metrics',
          description: 'View and analyze performance data',
          enabled: true,
        },
      ],
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<string>('1');

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: role.permissions.map(permission => {
            if (permission.id === permissionId) {
              return { ...permission, enabled: !permission.enabled };
            }
            return permission;
          }),
        };
      }
      return role;
    }));
  };

  const handleSavePermissions = () => {
    // Implement save permissions logic here
    console.log('Saving permissions:', roles);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roleBar}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleButton,
              selectedRole === role.id && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole(role.id)}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === role.id && styles.selectedRoleText,
              ]}
            >
              {role.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.permissionList}>
        {roles.find(role => role.id === selectedRole)?.permissions.map((permission) => (
          <View key={permission.id} style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Text style={styles.permissionName}>{permission.name}</Text>
              <Text style={styles.permissionDescription}>
                {permission.description}
              </Text>
            </View>
            <Switch
              value={permission.enabled}
              onValueChange={() => handlePermissionToggle(selectedRole, permission.id)}
              trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
              thumbColor={permission.enabled ? '#FFD700' : '#f4f3f4'}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePermissions}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Changes will be applied to all users with this role
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  roleBar: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#2A2E37',
  },
  selectedRole: {
    backgroundColor: '#3A3E47',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedRoleText: {
    color: '#FFD700',
  },
  permissionList: {
    flex: 1,
    padding: 15,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  permissionInfo: {
    flex: 1,
    marginRight: 15,
  },
  permissionName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#2A2E37',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 