import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

type NavItem = {
  name: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
};

type BottomNavigationProps = {
  items: NavItem[];
};

const { width } = Dimensions.get('window');
const isLargeScreen = width > theme.breakpoints.tablet;

export function BottomNavigation({ items }: BottomNavigationProps) {
  if (isLargeScreen) return null;

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.navItem, item.isActive && styles.activeNavItem]}
          onPress={item.onPress}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={item.isActive ? theme.colors.primary : theme.colors.text.muted}
          />
          <Text style={[
            styles.navText,
            item.isActive && styles.activeNavText
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.background.primary,
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderRadius: 25,
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeNavItem: {
    borderRadius: 20,
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 4,
  },
  activeNavText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
}); 