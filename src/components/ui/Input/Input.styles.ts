import { StyleSheet } from 'react-native';
import { ColorTokens, SemanticColors } from '../../../styles/tokens/colors';
import { TypographyTokens } from '../../../styles/tokens/typography';
import { SpacingTokens } from '../../../styles/tokens/spacing';
import { ValidationState } from './Input.types';

/**
 * Input component styles
 */

export const styles = StyleSheet.create({
  container: {
    marginVertical: SpacingTokens.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    paddingHorizontal: SpacingTokens.md,
  },
  input: {
    flex: 1,
    fontFamily: TypographyTokens.fontFamily.primary,
    fontSize: TypographyTokens.fontSize.base,
    lineHeight: TypographyTokens.fontSize.base * TypographyTokens.lineHeight.normal,
    color: ColorTokens.neutral[900],
    paddingVertical: SpacingTokens.sm,
  },
  label: {
    fontFamily: TypographyTokens.fontFamily.primary,
    fontSize: TypographyTokens.fontSize.sm,
    fontWeight: TypographyTokens.fontWeight.medium,
    color: ColorTokens.neutral[700],
    marginBottom: SpacingTokens.xs,
  },
  floatingLabel: {
    position: 'absolute',
    left: SpacingTokens.md,
    fontFamily: TypographyTokens.fontFamily.primary,
    fontSize: TypographyTokens.fontSize.sm,
    fontWeight: TypographyTokens.fontWeight.medium,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
  },
  icon: {
    fontSize: 20,
    marginHorizontal: SpacingTokens.xs,
  },
  leftIcon: {
    marginRight: SpacingTokens.sm,
  },
  rightIcon: {
    marginLeft: SpacingTokens.sm,
  },
  toggleIcon: {
    marginLeft: SpacingTokens.sm,
    padding: SpacingTokens.xs,
  },
  messageContainer: {
    marginTop: SpacingTokens.xs,
    marginHorizontal: SpacingTokens.xs,
  },
  messageText: {
    fontFamily: TypographyTokens.fontFamily.primary,
    fontSize: TypographyTokens.fontSize.xs,
    lineHeight: TypographyTokens.fontSize.xs * TypographyTokens.lineHeight.normal,
  },
  required: {
    color: ColorTokens.semantic.error[500],
  },
  disabled: {
    backgroundColor: ColorTokens.neutral[100],
    opacity: 0.6,
  },
  multiline: {
    minHeight: 80,
    paddingTop: SpacingTokens.md,
    textAlignVertical: 'top',
  },
});

// Validation state styles
export const getValidationStyles = (state: ValidationState) => {
  switch (state) {
    case 'error':
      return {
        inputContainer: {
          borderColor: ColorTokens.semantic.error[500],
          borderWidth: 2,
        },
        label: {
          color: ColorTokens.semantic.error[600],
        },
        floatingLabel: {
          color: ColorTokens.semantic.error[600],
        },
        messageText: {
          color: ColorTokens.semantic.error[600],
        },
      };
    
    case 'success':
      return {
        inputContainer: {
          borderColor: ColorTokens.semantic.success[500],
          borderWidth: 2,
        },
        label: {
          color: ColorTokens.semantic.success[600],
        },
        floatingLabel: {
          color: ColorTokens.semantic.success[600],
        },
        messageText: {
          color: ColorTokens.semantic.success[600],
        },
      };
    
    case 'warning':
      return {
        inputContainer: {
          borderColor: ColorTokens.semantic.warning[500],
          borderWidth: 2,
        },
        label: {
          color: ColorTokens.semantic.warning[600],
        },
        floatingLabel: {
          color: ColorTokens.semantic.warning[600],
        },
        messageText: {
          color: ColorTokens.semantic.warning[600],
        },
      };
    
    default:
      return {
        inputContainer: {
          borderColor: SemanticColors.border.default,
        },
        label: {
          color: ColorTokens.neutral[700],
        },
        floatingLabel: {
          color: ColorTokens.neutral[600],
        },
        messageText: {
          color: ColorTokens.neutral[600],
        },
      };
  }
};

// Focus state styles
export const getFocusStyles = (focused: boolean, state: ValidationState): {
  inputContainer?: any;
} => {
  if (!focused) return {};
  
  const baseStyles = {
    inputContainer: {
      borderWidth: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  };

  if (state === 'default') {
    return {
      ...baseStyles,
      inputContainer: {
        ...baseStyles.inputContainer,
        borderColor: ColorTokens.primary[500],
      },
    };
  }
  
  return baseStyles;
};