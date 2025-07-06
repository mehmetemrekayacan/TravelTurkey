/**
 * TravelTurkey - DetailScreen Styles (2025)
 * Modern styling with glassmorphism and neumorphism effects
 */

import { StyleSheet, Dimensions } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '../../styles/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.5;

export const createDetailScreenStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.neutral[50],
    },

    // Animated Header
    animatedHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 60 + insets.top,
      paddingTop: insets.top,
      paddingHorizontal: Theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      // Neumorphism effect
      shadowColor: Theme.colors.neutral[900],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    backButtonText: {
      fontSize: Theme.typography.fontSize.xl,
      color: Theme.colors.neutral[900],
      fontWeight: Theme.typography.fontWeight.semiBold,
    },

    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: Theme.typography.fontSize.lg,
      fontWeight: Theme.typography.fontWeight.semiBold,
      color: Theme.colors.neutral[900],
      marginHorizontal: Theme.spacing.md,
    },

    headerActionButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Theme.colors.neutral[900],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    headerActionText: {
      fontSize: Theme.typography.fontSize.lg,
    },

    // Scroll View
    scrollView: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
    },

    // Hero Section
    heroContainer: {
      height: HERO_HEIGHT,
      position: 'relative',
      overflow: 'hidden',
    },

    heroImageContainer: {
      ...StyleSheet.absoluteFillObject,
    },

    heroImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Gradient overlay effect
    },

    heroContent: {
      position: 'absolute',
      bottom: Theme.spacing.xl,
      left: Theme.spacing.md,
      right: Theme.spacing.md,
      // Glassmorphism container
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: Theme.borderRadius.xl,
      padding: Theme.spacing.lg,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },

    heroCategory: {
      fontSize: Theme.typography.fontSize.sm,
      fontWeight: Theme.typography.fontWeight.semiBold,
      color: Theme.colors.accent.gold[400],
      letterSpacing: Theme.typography.letterSpacing.wide,
      marginBottom: Theme.spacing.xs,
    },

    heroTitle: {
      fontSize: Theme.typography.fontSize['4xl'],
      fontWeight: Theme.typography.fontWeight.bold,
      color: Theme.colors.neutral[50],
      lineHeight: Theme.typography.lineHeight.tight,
      marginBottom: Theme.spacing.sm,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },

    heroLocation: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    heroLocationText: {
      fontSize: Theme.typography.fontSize.base,
      color: Theme.colors.neutral[200],
      fontWeight: Theme.typography.fontWeight.medium,
    },

    // Floating Action Buttons
    fabContainer: {
      position: 'absolute',
      top: 100 + insets.top,
      right: Theme.spacing.md,
      gap: Theme.spacing.sm,
    },

    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      // Enhanced neumorphism with dual shadows
      shadowColor: Theme.colors.neutral[600],
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 10,
      // Inner light effect
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },

    fabLiked: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      shadowColor: Theme.colors.primary[400],
    },

    // Content Container
    contentContainer: {
      backgroundColor: Theme.colors.neutral[50],
      borderTopLeftRadius: Theme.borderRadius['3xl'],
      borderTopRightRadius: Theme.borderRadius['3xl'],
      marginTop: -Theme.spacing.lg,
      paddingTop: Theme.spacing.xl,
      paddingHorizontal: Theme.spacing.md,
      zIndex: 10,
    },

    // Info Cards
    infoCardsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Theme.spacing.xl,
      gap: Theme.spacing.sm,
    },

    infoCard: {
      flex: 1,
      backgroundColor: Theme.colors.neutral[50],
      borderRadius: Theme.borderRadius.xl,
      padding: Theme.spacing.md,
      // Neumorphism effect
      shadowColor: Theme.colors.neutral[400],
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      // Inner shadow (simulated)
      borderWidth: 1,
      borderColor: Theme.colors.neutral[100],
    },

    infoCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Theme.spacing.xs,
    },

    infoCardTitle: {
      fontSize: Theme.typography.fontSize.sm,
      fontWeight: Theme.typography.fontWeight.medium,
      color: Theme.colors.neutral[600],
    },

    infoCardValue: {
      fontSize: Theme.typography.fontSize.lg,
      fontWeight: Theme.typography.fontWeight.bold,
      color: Theme.colors.neutral[900],
    },

    infoCardSubtext: {
      fontSize: Theme.typography.fontSize.xs,
      color: Theme.colors.neutral[500],
    },

    // Enhanced Info Cards with new elements
    ratingBar: {
      height: 4,
      backgroundColor: Theme.colors.neutral[200],
      borderRadius: 2,
      marginTop: Theme.spacing.xs,
      overflow: 'hidden',
    },

    ratingFill: {
      height: '100%',
      backgroundColor: Theme.colors.accent.gold[500],
      borderRadius: 2,
    },

    priceNote: {
      fontSize: Theme.typography.fontSize.xs,
      color: Theme.colors.accent.turquoise[600],
      marginTop: Theme.spacing.xs,
      fontWeight: Theme.typography.fontWeight.medium,
    },

    durationTip: {
      fontSize: Theme.typography.fontSize.xs,
      color: Theme.colors.primary[600],
      marginTop: Theme.spacing.xs,
      fontStyle: 'italic',
    },

    // Enhanced Features Section
    featuresContainer: {
      marginTop: Theme.spacing.lg,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: Theme.borderRadius.xl,
      padding: Theme.spacing.md,
      // Enhanced glassmorphism
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      shadowColor: Theme.colors.neutral[400],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 4,
    },

    featuresTitle: {
      fontSize: Theme.typography.fontSize.lg,
      fontWeight: Theme.typography.fontWeight.semiBold,
      color: Theme.colors.neutral[800],
      marginBottom: Theme.spacing.md,
      textAlign: 'center',
    },

    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: Theme.spacing.sm,
    },

    featureItem: {
      flex: 1,
      minWidth: '22%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: Theme.borderRadius.lg,
      padding: Theme.spacing.sm,
      alignItems: 'center',
      // Soft neumorphism
      shadowColor: Theme.colors.neutral[300],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },

    featureIcon: {
      fontSize: Theme.typography.fontSize.lg,
      marginBottom: Theme.spacing.xs,
    },

    featureText: {
      fontSize: Theme.typography.fontSize.xs,
      fontWeight: Theme.typography.fontWeight.medium,
      color: Theme.colors.neutral[700],
      textAlign: 'center',
    },

    // Enhanced Description Container with better glassmorphism
    descriptionContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: Theme.borderRadius.xl,
      padding: Theme.spacing.lg,
      marginBottom: Theme.spacing.md,
      // Advanced glassmorphism effect
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      shadowColor: Theme.colors.neutral[400],
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
    },

    // Enhanced Read More Button
    readMoreButton: {
      alignSelf: 'center',
      marginTop: Theme.spacing.md,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      paddingHorizontal: Theme.spacing.lg,
      paddingVertical: Theme.spacing.sm,
      borderRadius: Theme.borderRadius.full,
      borderWidth: 1,
      borderColor: Theme.colors.primary[200],
    },

    readMoreText: {
      fontSize: Theme.typography.fontSize.sm,
      fontWeight: Theme.typography.fontWeight.semiBold,
      color: Theme.colors.primary[600],
      textAlign: 'center',
    },

    // Enhanced Tags
    tag: {
      backgroundColor: 'rgba(20, 184, 166, 0.15)',
      borderRadius: Theme.borderRadius.full,
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: Theme.spacing.sm,
      borderWidth: 1.5,
      borderColor: 'rgba(20, 184, 166, 0.3)',
      // Soft glow effect
      shadowColor: Theme.colors.accent.turquoise[400],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
    },

    // Enhanced FAB with better neumorphism (already defined above)
    fabIcon: {
      fontSize: Theme.typography.fontSize.xl,
    },

    // Enhanced Map Container with neumorphism
    mapContainer: {
      marginBottom: Theme.spacing.md,
    },

    mapPlaceholder: {
      height: 200,
      backgroundColor: 'rgba(248, 250, 252, 0.9)',
      borderRadius: Theme.borderRadius.xl,
      justifyContent: 'center',
      alignItems: 'center',
      // Inset neumorphism effect
      shadowColor: Theme.colors.neutral[400],
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },

    // Enhanced Directions Button
    directionsButton: {
      backgroundColor: Theme.colors.primary[600],
      borderRadius: Theme.borderRadius.xl,
      paddingVertical: Theme.spacing.lg,
      paddingHorizontal: Theme.spacing.xl,
      alignItems: 'center',
      // Modern button with glow
      shadowColor: Theme.colors.primary[600],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: Theme.colors.primary[400],
    },

    directionsButtonText: {
      fontSize: Theme.typography.fontSize.lg,
      fontWeight: Theme.typography.fontWeight.bold,
      color: Theme.colors.neutral[50],
      letterSpacing: 0.5,
    },

    // Enhanced Working Hours with glassmorphism
    workingHoursContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: Theme.borderRadius.xl,
      padding: Theme.spacing.lg,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      shadowColor: Theme.colors.neutral[300],
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },

    workingHourRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(203, 213, 225, 0.5)',
    },

    dayText: {
      fontSize: Theme.typography.fontSize.base,
      fontWeight: Theme.typography.fontWeight.medium,
      color: Theme.colors.neutral[700],
      textTransform: 'capitalize',
    },

    hoursText: {
      fontSize: Theme.typography.fontSize.base,
      color: Theme.colors.neutral[600],
      fontFamily: Theme.typography.fonts.mono,
    },

    noInfoText: {
      fontSize: Theme.typography.fontSize.base,
      color: Theme.colors.neutral[500],
      textAlign: 'center',
      fontStyle: 'italic',
    },

    // Missing Section Styles
    section: {
      marginBottom: Theme.spacing.xl,
    },

    sectionTitle: {
      fontSize: Theme.typography.fontSize.xl,
      fontWeight: Theme.typography.fontWeight.bold,
      color: Theme.colors.neutral[900],
      marginBottom: Theme.spacing.md,
    },

    // Description Styles
    descriptionText: {
      fontSize: Theme.typography.fontSize.base,
      lineHeight: Theme.typography.lineHeight.relaxed,
      color: Theme.colors.neutral[700],
      marginBottom: Theme.spacing.sm,
    },

    // Tags Styles
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Theme.spacing.sm,
    },

    tagText: {
      fontSize: Theme.typography.fontSize.sm,
      fontWeight: Theme.typography.fontWeight.medium,
      color: Theme.colors.accent.turquoise[700],
    },

    // Map Styles
    mapText: {
      fontSize: Theme.typography.fontSize['3xl'],
      marginBottom: Theme.spacing.sm,
    },

    mapSubtext: {
      fontSize: Theme.typography.fontSize.lg,
      fontWeight: Theme.typography.fontWeight.semiBold,
      color: Theme.colors.neutral[700],
      marginBottom: Theme.spacing.xs,
    },

    mapCoordinates: {
      fontSize: Theme.typography.fontSize.sm,
      color: Theme.colors.neutral[500],
      fontFamily: Theme.typography.fonts.mono,
    },
  });
