import { useState, useCallback } from 'react';
import type { ValidationRule } from '../utils/validation/validators';

export type ValidationErrors = Record<string, string>;
export type FormValues = Record<string, any>;
export type FormValidationRules = Record<string, ValidationRule<any>[]>;

export function useFormValidation<T extends FormValues>(rules: FormValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: keyof T, value: any) => {
    const fieldRules = rules[name] || [];
    
    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  }, [rules]);

  const validateForm = useCallback((values: T) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(name => {
      const value = values[name as keyof T];
      const fieldRules = rules[name];

      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          newErrors[name] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    handleBlur,
    clearErrors
  };
}