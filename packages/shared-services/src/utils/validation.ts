/**
 * Validation Utilities for SISO-PUBLIC
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationUtils {
  static email(email: string): ValidationResult {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Email format is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static password(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static phone(phone: string): ValidationResult {
    const errors: string[] = [];
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;

    if (!phone) {
      errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone)) {
      errors.push('Phone number format is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static required(value: any, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value === null || value === undefined || value === '') {
      errors.push(`${fieldName} is required`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static minLength(value: string, minLength: number, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value && value.length < minLength) {
      errors.push(`${fieldName} must be at least ${minLength} characters long`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static maxLength(value: string, maxLength: number, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value && value.length > maxLength) {
      errors.push(`${fieldName} must be no more than ${maxLength} characters long`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static url(url: string): ValidationResult {
    const errors: string[] = [];

    try {
      new URL(url);
    } catch {
      errors.push('URL format is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static combine(...validations: ValidationResult[]): ValidationResult {
    const allErrors = validations.flatMap(v => v.errors);
    
    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }
}