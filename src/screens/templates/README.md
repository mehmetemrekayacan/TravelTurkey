# TravelTurkey Screen Templates

Modern, reusable TypeScript screen components with advanced UI patterns for React Native.

## 🚀 Features

### Modern UI Patterns for 2025

- **Skeleton Loaders**: Smooth loading states with animated placeholders
- **Card-based Layouts**: Clean, organized content presentation
- **Micro-interactions**: Haptic feedback and smooth animations
- **Dark Mode Ready**: Consistent theming system
- **Accessibility**: Screen reader support and proper contrast ratios

### Advanced TypeScript Integration

- **Strict Type Safety**: Full TypeScript interfaces and props
- **Navigation Types**: React Navigation 6 with proper typing
- **Reusable Interfaces**: Shared types across components
- **Generic Components**: Flexible, type-safe component patterns

## 📱 Screen Templates

### 1. ExploreScreenTemplate

Advanced exploration screen with search, filtering, and card-based content.

**Features:**

- Dynamic search with real-time filtering
- Category-based filtering with animated chips
- Skeleton loading states
- Pull-to-refresh functionality
- Card animations with haptic feedback
- Empty state handling
- Badge notifications support

**Key Components:**

- `AnimatedIcon`: Vector icons with smooth animations
- `SkeletonCard`: Loading placeholder with pulse animation
- `ExploreCard`: Interactive content cards with micro-interactions

**Usage:**

```tsx
import { ExploreScreenTemplate } from '../templates';

const ExploreScreen = () => <ExploreScreenTemplate />;
```

### 2. PlansScreenTemplate

Comprehensive travel planning interface with forms and task management.

**Features:**

- Travel plan creation and editing
- Task management with progress tracking
- Modal-based forms with validation
- Status badges and progress indicators
- Budget tracking
- Swipe actions for plan management
- Empty state with call-to-action

**Key Components:**

- `PlanCard`: Rich plan display with stats and actions
- `PlanFormModal`: Full-screen modal with form validation
- `ProgressBar`: Animated progress visualization

**Data Structures:**

- `TravelPlan`: Complete plan with tasks and metadata
- `PlanTask`: Individual tasks with categories and priorities
- `PlanFormData`: Form validation and data structure

**Usage:**

```tsx
import { PlansScreenTemplate } from '../templates';

const PlansScreen = () => <PlansScreenTemplate />;
```

### 3. ProfileScreenTemplate

Modern user profile with settings, preferences, and statistics.

**Features:**

- User profile header with avatar
- Statistics grid with animated counters
- Settings sections with toggles and navigation
- Preference management (notifications, privacy, display)
- Logout confirmation flow
- Profile editing capability

**Key Components:**

- `ProfileHeader`: User info with editable avatar
- `StatsGrid`: Achievement and usage statistics
- `SettingsSection`: Grouped settings with various input types

**Settings Categories:**

- **Notifications**: Push, email, marketing preferences
- **Privacy**: Profile visibility, location tracking, data collection
- **Display**: Dark mode, language, currency
- **Account**: Help, about, logout

**Usage:**

```tsx
import { ProfileScreenTemplate } from '../templates';

const ProfileScreen = () => <ProfileScreenTemplate />;
```

## 🎨 Design System Integration

All templates use the consistent design system from `theme.ts`:

### Colors

- Primary: Turkish flag red (#DC2626)
- Secondary: Bosphorus blue (#1E3A8A)
- Accent: Golden yellow (#F59E0B)
- Semantic colors for success, warning, error states

### Typography

- Font families: Poppins (primary), Inter (secondary)
- Responsive font sizes following 8-point grid
- Consistent line heights and letter spacing

### Spacing & Layout

- 8-point grid system for consistent spacing
- Responsive layouts with proper margins and padding
- Shadow system for depth and hierarchy

### Animations

- Spring-based animations for natural feel
- Staggered animations for list items
- Micro-interactions with haptic feedback
- Smooth transitions between states

## 🔧 Technical Implementation

### State Management

- React hooks for local state
- Optimized re-renders with `useCallback` and `useMemo`
- Proper cleanup for animations and subscriptions

### Performance Optimizations

- `React.memo` for expensive components
- FlatList for large datasets
- Image lazy loading placeholders
- Debounced search inputs

### Accessibility

- Semantic HTML/React Native components
- Proper ARIA labels and hints
- High contrast color ratios
- Screen reader compatibility

### Navigation Integration

- Typed navigation props
- Deep linking support
- Proper back button handling
- Tab navigation with badges

## 📋 Usage Guidelines

### Installation

1. Ensure all dependencies are installed:

```bash
npm install react-native-vector-icons react-native-haptic-feedback
```

2. Import and use templates:

```tsx
import {
  ExploreScreenTemplate,
  PlansScreenTemplate,
  ProfileScreenTemplate,
} from '../screens/templates';
```

### Customization

Each template accepts props for customization:

```tsx
// Example: Custom navigation handling
<ExploreScreenTemplate
  navigation={navigation}
  onItemPress={item => navigation.navigate('PlaceDetail', { place: item })}
/>
```

### Theming

Templates automatically use the app's theme system. To customize:

```tsx
// Modify theme.ts values
export const AppColors = {
  PRIMARY: '#your-color',
  // ... other colors
};
```

## 🔄 State Flow

### ExploreScreen

1. Load → Show skeletons
2. Data loaded → Animate content in
3. User interaction → Filter/search
4. Navigation → Deep link to details

### PlansScreen

1. Load plans → Display with stats
2. Create/Edit → Modal form
3. Save → Update list with animation
4. Delete → Confirmation → Remove

### ProfileScreen

1. Load profile → Display sections
2. Toggle settings → Update preferences
3. Edit profile → Navigation to form
4. Logout → Confirmation flow

## 🚧 Future Enhancements

- **Offline Support**: Cache data and sync when online
- **Push Notifications**: Integration with Firebase/APNs
- **Analytics**: User interaction tracking
- **A/B Testing**: Component variant testing
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced screen reader support

## 📝 Best Practices

1. **Type Safety**: Always use TypeScript interfaces
2. **Performance**: Minimize re-renders with proper memoization
3. **Accessibility**: Test with screen readers
4. **Error Handling**: Graceful fallbacks for failed states
5. **Loading States**: Always provide visual feedback
6. **Animations**: Use native driver when possible
7. **Testing**: Unit tests for business logic
8. **Documentation**: Keep interfaces well-documented

## 🔗 Related Files

- `src/constants/Colors.ts` - Color palette
- `src/styles/theme.ts` - Design system
- `src/types/navigation.ts` - Navigation types
- `src/components/navigation/VectorTabIcons.tsx` - Tab icons
- `src/navigation/BottomTabNavigator.tsx` - Tab navigation

---

Built with ❤️ for TravelTurkey - Discover the beauty of Turkey with modern mobile technology.
