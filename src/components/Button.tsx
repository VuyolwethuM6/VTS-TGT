import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : '#FFFFFF'} />;
    }
    return <Text style={textStyles}>{title}</Text>;
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
          style={buttonStyles}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        buttonStyles,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  smallText: {
    ...theme.typography.button2,
  },
  mediumText: {
    ...theme.typography.button1,
  },
  largeText: {
    ...theme.typography.button1,
    fontSize: 18,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: theme.colors.background.card,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: theme.colors.text.muted,
  },
}); 