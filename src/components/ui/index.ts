/**
 * UI Components Index
 * Modern UI Design System for TravelTurkey
 * 
 * Exports all UI components for easy importing throughout the app.
 * Provides a comprehensive design system with Turkish tourism theming.
 */

// Core UI Components
export { Button } from './Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button/Button.types';

export { Input } from './Input/Input';
export type { 
  InputProps, 
  InputType, 
  ValidationState 
} from './Input/Input.types';

export { Card } from './Card/Card';
export type { 
  CardProps, 
  CardVariant, 
  CardSize, 
  ImageLayout 
} from './Card/Card.types';

export { Icon } from './Icon/Icon';
export type { IconProps, IconName, IconSize } from './Icon/Icon.types';

// Typography Components
export {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  BodyLarge,
  BodyMedium,
  BodySmall,
  Caption,
  Label,
} from './Typography/Typography';
export type {
  TypographyProps,
  TypographyVariant,
  TextAlign,
  TextColor,
  HeadingProps,
  BodyProps,
  CaptionProps,
  LabelProps,
} from './Typography/Typography.types';

/**
 * Usage Examples:
 * 
 * ```tsx
 * import { Button, Card, Input, Icon, Heading1, BodyMedium } from '@/components/ui';
 * 
 * // Button usage
 * <Button
 *   title="Keşfet"
 *   variant="primary"
 *   size="medium"
 *   icon="🔍"
 *   onPress={() => navigate('Search')}
 * />
 * 
 * // Card usage
 * <Card
 *   variant="tourism"
 *   imageSource={{ uri: 'https://example.com/cappadocia.jpg' }}
 *   imageLayout="background"
 *   gradientOverlay
 *   badge="Öne Çıkan"
 *   onPress={() => navigate('Destination')}
 * >
 *   <Heading3 color="inverse">Kapadokya</Heading3>
 *   <BodyMedium color="inverse">Benzersiz peri bacaları</BodyMedium>
 * </Card>
 * 
 * // Input usage
 * <Input
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   type="search"
 *   placeholder="Nereyi keşfetmek istiyorsun?"
 *   leftIcon="🔍"
 *   validationState="default"
 * />
 * 
 * // Icon usage
 * <Icon 
 *   name="mosque" 
 *   size="lg" 
 *   color="#DC2626"
 *   onPress={() => filterByCategory('mosque')}
 * />
 * 
 * // Typography usage
 * <Heading1 align="center">Türkiye'yi Keşfet</Heading1>
 * <BodyMedium color="secondary">
 *   En güzel destinasyonları keşfedin ve unutulmaz anılar biriktirin.
 * </BodyMedium>
 * ```
 */