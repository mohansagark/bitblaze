/**
 * Environment configuration utilities
 */

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback value if env var is not found
 * @returns {string} Environment variable value or fallback
 */
export const getEnvVar = (key, fallback = '') => {
  return process.env[key] || fallback;
};

/**
 * Check if we're in development mode
 * @returns {boolean} True if in development mode
 */
export const isDevelopment = () => {
  return getEnvVar('REACT_APP_ENV', 'development') === 'development';
};

/**
 * Check if we're in production mode
 * @returns {boolean} True if in production mode
 */
export const isProduction = () => {
  return getEnvVar('REACT_APP_ENV', 'development') === 'production';
};

/**
 * Check if debug mode is enabled
 * @returns {boolean} True if debug mode is enabled
 */
export const isDebugEnabled = () => {
  return getEnvVar('REACT_APP_DEBUG', 'false') === 'true';
};

/**
 * Check if a feature flag is enabled
 * @param {string} feature - Feature flag name
 * @returns {boolean} True if feature is enabled
 */
export const isFeatureEnabled = feature => {
  return getEnvVar(`REACT_APP_ENABLE_${feature.toUpperCase()}`, 'false') === 'true';
};

/**
 * Get API URL with fallback
 * @returns {string} API URL
 */
export const getApiUrl = () => {
  return getEnvVar('REACT_APP_API_URL', 'http://localhost:3001');
};

/**
 * Get Vercel Analytics ID
 * @returns {string} Analytics ID
 */
export const getAnalyticsId = () => {
  return getEnvVar('REACT_APP_VERCEL_ANALYTICS_ID', '');
};

/**
 * Validate required environment variables
 * @returns {object} Validation result with missing variables
 */
export const validateEnvironment = () => {
  const required = [];
  const missing = [];

  // Add required env vars for production
  if (isProduction()) {
    required.push('REACT_APP_VERCEL_ANALYTICS_ID');
  }

  required.forEach(envVar => {
    if (!getEnvVar(envVar)) {
      missing.push(envVar);
    }
  });

  return {
    isValid: missing.length === 0,
    missing,
  };
};

/**
 * Log environment configuration in development
 */
export const logEnvironmentConfig = () => {
  if (isDevelopment() && isDebugEnabled()) {
    // Environment configuration logging disabled
  }
};
