import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
};

export function Header({ title, onBack, rightComponent }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightComponent && (
        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: theme.layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.primary,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 