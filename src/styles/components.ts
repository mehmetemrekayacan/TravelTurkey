/**
 * TravelTurkey App - Component Styles
 * Pre-built component styles using the design system
 */

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from './theme';
import { TextStyles } from './typography';

// Button Styles
export const ButtonStyles = StyleSheet.create({
  // Primary Button
  primaryLarge: {
    height: Theme.components.button.height.lg,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.base,
  } as ViewStyle,

  primaryMedium: {
    height: Theme.components.button.height.md,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.base,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.sm,
  } as ViewStyle,

  primarySmall: {
    height: Theme.components.button.height.sm,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.sm,
    paddingHorizontal: Theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  // Secondary Button
  secondaryLarge: {
    height: Theme.components.button.height.lg,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  secondaryMedium: {
    height: Theme.components.button.height.md,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.base,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  // Tertiary Button
  tertiary: {
    backgroundColor: 'transparent',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  // Disabled Button
  disabled: {
    backgroundColor: Theme.colors.neutral[300],
    borderColor: Theme.colors.neutral[300],
  } as ViewStyle,
});

// Button Text Styles
export const ButtonTextStyles = StyleSheet.create({
  primaryText: {
    ...TextStyles.buttonMedium,
    color: Theme.colors.neutral[50],
  } as TextStyle,

  secondaryText: {
    ...TextStyles.buttonMedium,
    color: Theme.colors.primary[500],
  } as TextStyle,

  tertiaryText: {
    ...TextStyles.buttonMedium,
    color: Theme.colors.secondary[600],
  } as TextStyle,

  disabledText: {
    ...TextStyles.buttonMedium,
    color: Theme.colors.neutral[500],
  } as TextStyle,
});

// Card Styles
export const CardStyles = StyleSheet.create({
  default: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.components.card.borderRadius,
    padding: Theme.components.card.padding,
    ...Theme.components.card.shadow,
  } as ViewStyle,

  elevated: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.components.card.borderRadius,
    padding: Theme.components.card.padding,
    ...Theme.shadows.lg,
  } as ViewStyle,

  outline: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.components.card.borderRadius,
    padding: Theme.components.card.padding,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  } as ViewStyle,

  filled: {
    backgroundColor: Theme.colors.primary[50],
    borderRadius: Theme.components.card.borderRadius,
    padding: Theme.components.card.padding,
    borderWidth: 1,
    borderColor: Theme.colors.primary[100],
  } as ViewStyle,

  compact: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.base,
    padding: Theme.spacing.sm,
    ...Theme.shadows.sm,
  } as ViewStyle,
});

// Input Styles
export const InputStyles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  } as ViewStyle,

  default: {
    height: Theme.components.input.height,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.components.input.borderRadius,
    borderWidth: Theme.components.input.borderWidth,
    borderColor: Theme.colors.neutral[300],
    paddingHorizontal: Theme.components.input.padding,
    fontSize: Theme.typography.fontSize.base,
    fontFamily: Theme.typography.fonts.secondary,
    color: Theme.colors.neutral[900],
  } as TextStyle,

  focused: {
    borderColor: Theme.colors.primary[500],
    borderWidth: 2,
    ...Theme.shadows.sm,
  } as ViewStyle,

  error: {
    borderColor: Theme.colors.semantic.error[500],
    borderWidth: 2,
  } as ViewStyle,

  disabled: {
    backgroundColor: Theme.colors.neutral[100],
    color: Theme.colors.neutral[500],
  } as ViewStyle,

  label: {
    ...TextStyles.labelMedium,
    marginBottom: Theme.spacing.xs,
  } as TextStyle,

  helperText: {
    ...TextStyles.caption,
    marginTop: Theme.spacing.xs,
  } as TextStyle,

  errorText: {
    ...TextStyles.error,
    marginTop: Theme.spacing.xs,
  } as TextStyle,
});

// Header Styles
export const HeaderStyles = StyleSheet.create({
  container: {
    height: Theme.components.header.height,
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: Theme.components.header.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Theme.shadows.base,
  } as ViewStyle,

  title: {
    ...TextStyles.heading2,
    color: Theme.colors.neutral[50],
  } as TextStyle,

  subtitle: {
    ...TextStyles.bodySmall,
    color: Theme.colors.neutral[200],
  } as TextStyle,

  transparent: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  } as ViewStyle,

  gradient: {
    // For use with LinearGradient component
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
  } as ViewStyle,
});

// Tab Bar Styles
export const TabBarStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
    paddingBottom: Theme.spacing.xs,
    ...Theme.shadows.base,
  } as ViewStyle,

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.sm,
  } as ViewStyle,

  activeTab: {
    borderTopWidth: 2,
    borderTopColor: Theme.colors.primary[500],
  } as ViewStyle,

  tabLabel: {
    ...TextStyles.labelSmall,
    marginTop: Theme.spacing.xs,
  } as TextStyle,

  activeTabLabel: {
    color: Theme.colors.primary[500],
    fontWeight: '600',
  } as TextStyle,

  inactiveTabLabel: {
    color: Theme.colors.neutral[500],
  } as TextStyle,
});

// List Item Styles
export const ListItemStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral[50],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  content: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  } as ViewStyle,

  title: {
    ...TextStyles.bodyMedium,
    fontWeight: '500',
  } as TextStyle,

  subtitle: {
    ...TextStyles.bodySmall,
    marginTop: Theme.spacing.xs / 2,
  } as TextStyle,

  trailing: {
    marginLeft: Theme.spacing.sm,
  } as ViewStyle,

  pressable: {
    backgroundColor: Theme.colors.neutral[100],
  } as ViewStyle,
});

// Modal Styles
export const ModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.md,
  } as ViewStyle,

  content: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...Theme.shadows.xl,
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  } as ViewStyle,

  title: {
    ...TextStyles.heading2,
  } as TextStyle,

  body: {
    marginBottom: Theme.spacing.lg,
  } as ViewStyle,

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.sm,
  } as ViewStyle,
});

// Loading Styles
export const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[50],
  } as ViewStyle,

  spinner: {
    marginBottom: Theme.spacing.md,
  } as ViewStyle,

  text: {
    ...TextStyles.bodyMedium,
    textAlign: 'center',
  } as TextStyle,

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  } as ViewStyle,
});

// Search Styles
export const SearchStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral[50],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  } as ViewStyle,

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  } as ViewStyle,

  input: {
    flex: 1,
    fontSize: Theme.typography.fontSize.base,
    fontFamily: Theme.typography.fonts.secondary,
    color: Theme.colors.neutral[900],
    marginLeft: Theme.spacing.sm,
  } as TextStyle,

  icon: {
    color: Theme.colors.neutral[500],
  } as ViewStyle,

  clearButton: {
    padding: Theme.spacing.xs,
  } as ViewStyle,
});

// Export all styles
export const ComponentStyles = {
  Button: ButtonStyles,
  ButtonText: ButtonTextStyles,
  Card: CardStyles,
  Input: InputStyles,
  Header: HeaderStyles,
  TabBar: TabBarStyles,
  ListItem: ListItemStyles,
  Modal: ModalStyles,
  Loading: LoadingStyles,
  Search: SearchStyles,
};

export default ComponentStyles;
