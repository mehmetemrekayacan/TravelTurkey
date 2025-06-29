import { StyleSheet } from 'react-native';
import { Colors, AppColors } from '../constants/Colors';

/**
 * TravelTurkey App - Global Styles
 * 3 Tab yapısı için optimize edilmiş: Keşfet, Planlarım, Profil
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
    color: '#FFFFFF',
    marginBottom: 8,
  },

  titleMediumWhite: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 8,
  },

  bodyMediumWhiteCenter: {
    fontSize: 16,
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    backgroundColor: '#e74c3c',
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
    backgroundColor: '#ecf0f1',
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
});
