/**
 * Shared Services Package Entry Point
 * Central exports for API clients, business logic, and utilities
 */

// API exports
export { ApiClient, type ApiConfig, type ApiResponse, type ApiError } from './api/base';

// Business logic exports
export { AuthService, type AuthState } from './business/auth';
export { ClientService } from './business/client';
export { PartnerService } from './business/partner';

// Utility exports
export { ValidationUtils, type ValidationResult } from './utils/validation';
export { FormattingUtils } from './utils/formatting';

// Create configured API client instance
export const createApiClient = (config: ApiConfig) => new ApiClient(config);

// Create service instances with API client
export const createServices = (apiClient: ApiClient) => ({
  auth: new AuthService(apiClient),
  client: new ClientService(apiClient),
  partner: new PartnerService(apiClient),
});

// Default configuration factory
export const createDefaultConfig = (baseUrl: string, apiKey?: string): ApiConfig => ({
  baseUrl,
  timeout: 10000,
  retries: 3,
  apiKey,
});