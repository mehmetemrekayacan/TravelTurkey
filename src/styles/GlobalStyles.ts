import { StyleSheet } from 'react-native';
import { Colors, AppColors } from '../constants/Colors';

/**
 * TravelTurkey App - Global Styles
 * Modern Türkiye temalı stil dosyası
 */

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: AppColors.BG_LIGHT,
  },

  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BG_PRIMARY,
  },

  // Header Styles
  header: {
    backgroundColor: AppColors.SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.ui.headerText,
    marginLeft: 16,
  },

  // Card Styles
  card: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    marginBottom: 12,
  },

  // Button Styles
  buttonPrimary: {
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSecondary: {
    backgroundColor: AppColors.SECONDARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonAccent: {
    backgroundColor: AppColors.ACCENT,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonOutline: {
    borderWidth: 2,
    borderColor: AppColors.PRIMARY,
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Button Text Styles
  buttonTextPrimary: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonTextOutline: {
    color: AppColors.PRIMARY,
    fontSize: 16,
    fontWeight: '600',
  },

  // Text Styles
  titleLarge: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
  },

  titleMedium: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 6,
  },

  bodyLarge: {
    fontSize: 16,
    color: AppColors.TEXT_PRIMARY,
    lineHeight: 24,
  },

  bodyMedium: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 20,
  },

  caption: {
    fontSize: 12,
    color: AppColors.TEXT_LIGHT,
    lineHeight: 16,
  },

  // White Text Styles (for colored backgrounds)
  titleMediumWhite: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral.white,
    marginBottom: 6,
  },

  bodyMediumWhite: {
    fontSize: 14,
    color: Colors.neutral.white,
    lineHeight: 20,
    opacity: 0.9,
  },

  bodyMediumWhiteCenter: {
    fontSize: 14,
    color: Colors.neutral.white,
    lineHeight: 20,
    textAlign: 'center',
  },

  // Turkish Themed Styles
  turkishFlag: {
    backgroundColor: AppColors.TURKISH_FLAG,
    borderRadius: 4,
    padding: 8,
  },

  bosphorusTheme: {
    backgroundColor: AppColors.BOSPHORUS,
    borderRadius: 8,
    padding: 16,
  },

  cappadociaTheme: {
    backgroundColor: AppColors.CAPPADOCIA,
    borderRadius: 8,
    padding: 16,
  },

  goldenAccent: {
    backgroundColor: AppColors.GOLDEN_HORN,
    borderRadius: 6,
    padding: 12,
  },

  // Layout Helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  spaceAround: {
    justifyContent: 'space-around',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacing
  marginSmall: {
    margin: 8,
  },

  marginMedium: {
    margin: 16,
  },

  marginLarge: {
    margin: 24,
  },

  paddingSmall: {
    padding: 8,
  },

  paddingMedium: {
    padding: 16,
  },

  paddingLarge: {
    padding: 24,
  },
});
