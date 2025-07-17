import { StyleSheet } from 'react-native';
import { Colors, AppColors } from '../constants/Colors';

/**
 * TravelTurkey App - Global Styles
 * 3 Tab yapısı için optimize edilmiş: Keşfet, Planlarım, Profil
 */

// Modern Gradient References (for LinearGradient components)
export const GradientStyles = {
  primary: {
    colors: [Colors.primary.red, Colors.primary.blue],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  turkey: {
    colors: [
      Colors.primary.red,
      Colors.accent.antiqueGold,
      Colors.primary.blue,
    ],
    locations: [0, 0.5, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  sunset: {
    colors: [Colors.accent.cappadociaOrange, Colors.accent.desertRose],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
};

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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  touchableCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardText: {
    flex: 1,
    paddingRight: 8,
  },

  cardArrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoCard: {
    backgroundColor: AppColors.BG_SECONDARY,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.ACCENT,
  },

  // Typography Styles
  titleMedium: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 8,
  },

  titleSmall: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.TEXT_PRIMARY,
    marginBottom: 4,
  },

  titleLargeWhite: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.WHITE,
    marginBottom: 8,
  },

  titleMediumWhite: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.WHITE,
    marginBottom: 8,
  },

  bodyMedium: {
    fontSize: 16,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 24,
    marginBottom: 8,
  },

  bodySmall: {
    fontSize: 14,
    color: AppColors.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 4,
  },

  bodyMediumWhite: {
    fontSize: 16,
    color: AppColors.WHITE,
    lineHeight: 24,
    marginBottom: 8,
  },

  bodyMediumWhiteCenter: {
    fontSize: 16,
    color: AppColors.WHITE,
    lineHeight: 24,
    textAlign: 'center',
  },

  captionSecondary: {
    fontSize: 12,
    color: AppColors.TEXT_SECONDARY,
    fontStyle: 'italic',
  },

  // Icon Styles
  iconLarge: {
    fontSize: 32,
    textAlign: 'center',
  },

  iconMedium: {
    fontSize: 20,
    textAlign: 'center',
  },

  // Button Styles
  buttonPrimary: {
    backgroundColor: AppColors.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  buttonTextPrimary: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  // Theme Styles
  bosphorusTheme: {
    backgroundColor: AppColors.SECONDARY,
    padding: 20,
    borderRadius: 12,
  },

  turkishFlag: {
    backgroundColor: AppColors.ERROR,
    padding: 20,
    borderRadius: 12,
  },

  // Layout Helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  categoryItem: {
    flex: 1,
    minWidth: '45%',
    margin: 4,
  },

  // Progress Bar
  progressBarContainer: {
    width: 60,
    height: 8,
    backgroundColor: AppColors.BG_LIGHT,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },

  progressBar: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 4,
  },

  progressText: {
    position: 'absolute',
    right: -25,
    top: -8,
    fontSize: 10,
    color: AppColors.TEXT_SECONDARY,
  },

  // Screen Specific Styles
  planStatus: {
    justifyContent: 'space-between',
    marginTop: 8,
  },

  reservationStatus: {
    marginTop: 4,
  },

  searchButton: {
    marginTop: 12,
  },

  profileAvatar: {
    fontSize: 48,
    marginBottom: 8,
  },

  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  hotelRating: {
    marginTop: 4,
  },

  // Modern 2025 Design System - Glassmorphism & Neumorphism Effects
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 8,
  },

  glassmorphismCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    marginVertical: 8,
  },

  neumorphism: {
    backgroundColor: '#F0F0F3',
    borderRadius: 20,
    shadowColor: '#A3A3A3',
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  neumorphismInset: {
    backgroundColor: '#F0F0F3',
    borderRadius: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: -5,
  },

  modernCard: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    shadowColor: Colors.shadows.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  modernCardHero: {
    backgroundColor: AppColors.BG_PRIMARY,
    borderRadius: 24,
    padding: 24,
    marginVertical: 12,
    shadowColor: Colors.shadows.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 16,
  },

  // Modern Button Styles
  modernButton: {
    backgroundColor: Colors.primary.red,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  modernButtonSecondary: {
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary.blue,
  },

  modernTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.neutral.charcoal,
    letterSpacing: -0.5,
    lineHeight: 34,
  },

  modernSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.grayMedium,
    letterSpacing: -0.3,
    lineHeight: 24,
  },

  modernBody: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.neutral.charcoal,
    lineHeight: 24,
    letterSpacing: -0.1,
  },

  modernCaption: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.grayMedium,
    lineHeight: 18,
  },

  modernTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },

  modernPressable: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: AppColors.BG_PRIMARY,
    shadowColor: Colors.shadows.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  spacing2xs: { margin: 4 },
  spacingXs: { margin: 8 },
  spacingSm: { margin: 12 },
  spacingMd: { margin: 16 },
  spacingLg: { margin: 24 },
  spacingXl: { margin: 32 },
  spacing2xl: { margin: 48 },

  padding2xs: { padding: 4 },
  paddingXs: { padding: 8 },
  paddingSm: { padding: 12 },
  paddingMd: { padding: 16 },
  paddingLg: { padding: 24 },
  paddingXl: { padding: 32 },
  padding2xl: { padding: 48 },

  modernContainer: {
    flex: 1,
    backgroundColor: '#FAFBFC',
    paddingHorizontal: 16,
  },

  modernSection: {
    marginVertical: 16,
  },

  modernSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.neutral.charcoal,
    marginBottom: 16,
    letterSpacing: -0.4,
  },

  turkeyPatternBg: {
    backgroundColor: '#F8F9FA',
    // Note: Use with custom pattern component for repeating patterns
  },

  turkeyAccentBorder: {
    borderTopWidth: 3,
    borderTopColor: Colors.primary.red,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.grayLight,
  },

  accessibilityFocus: {
    borderWidth: 2,
    borderColor: Colors.accent.bosphorusBlue,
    borderRadius: 8,
  },

  highContrast: {
    backgroundColor: Colors.neutral.charcoal,
    color: Colors.neutral.white,
  },

  animatedScale: {
    transform: [{ scale: 1 }],
  },

  animatedOpacity: {
    opacity: 1,
  },

  animatedTranslate: {
    transform: [{ translateY: 0 }],
  },
});
