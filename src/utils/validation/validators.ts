export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export const required = (message = 'This field is required'): ValidationRule<any> => ({
  validate: (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null && value !== undefined;
  },
  message
});

export const email = (message = 'Invalid email address'): ValidationRule<string> => ({
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message
});

export const minLength = (length: number, message?: string): ValidationRule<string> => ({
  validate: (value) => value.length >= length,
  message: message || `Must be at least ${length} characters`
});

export const maxLength = (length: number, message?: string): ValidationRule<string> => ({
  validate: (value) => value.length <= length,
  message: message || `Must be no more than ${length} characters`
});

export const numeric = (message = 'Must be a number'): ValidationRule<string> => ({
  validate: (value) => !isNaN(Number(value)),
  message
});

export const min = (min: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value >= min,
  message: message || `Must be at least ${min}`
});

export const max = (max: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value <= max,
  message: message || `Must be no more than ${max}`
});

export const pattern = (regex: RegExp, message: string): ValidationRule<string> => ({
  validate: (value) => regex.test(value),
  message
});