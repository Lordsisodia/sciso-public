/**
 * Formatting Utilities for SISO-PUBLIC
 */

export class FormattingUtils {
  static currency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  }

  static date(date: Date | string, format: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: format
    }).format(dateObj);
  }

  static dateTime(date: Date | string, format: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: format,
      timeStyle: format
    }).format(dateObj);
  }

  static percentage(value: number, decimals: number = 2): string {
    return `${(value * 100).toFixed(decimals)}%`;
  }

  static number(value: number, decimals?: number): string {
    const options: Intl.NumberFormatOptions = {};
    
    if (decimals !== undefined) {
      options.minimumFractionDigits = decimals;
      options.maximumFractionDigits = decimals;
    }

    return new Intl.NumberFormat('en-US', options).format(value);
  }

  static phone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phone;
  }

  static truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength - suffix.length) + suffix;
  }

  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static titleCase(text: string): string {
    return text
      .split(' ')
      .map(word => this.capitalize(word))
      .join(' ');
  }

  static camelToKebab(text: string): string {
    return text.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }

  static kebabToCamel(text: string): string {
    return text.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  static fileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    
    return `${Math.round(size * 100) / 100} ${sizes[i]}`;
  }

  static relativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
}