/**
 * Validation utilities for forms and data
 */

/**
 * Check if a value is empty
 * @param {*} value - Value to check
 * @returns {boolean} True if value is empty
 */
export const isEmpty = value => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength score
 */
export const validatePassword = password => {
  const result = {
    isValid: false,
    strength: 0,
    errors: [],
  };

  if (isEmpty(password)) {
    result.errors.push('Password is required');
    return result;
  }

  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters long');
  } else {
    result.strength += 1;
  }

  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter');
  } else {
    result.strength += 1;
  }

  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter');
  } else {
    result.strength += 1;
  }

  if (!/\d/.test(password)) {
    result.errors.push('Password must contain at least one number');
  } else {
    result.strength += 1;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.errors.push('Password must contain at least one special character');
  } else {
    result.strength += 1;
  }

  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} Validation result
 */
export const validateUsername = username => {
  const result = {
    isValid: false,
    errors: [],
  };

  if (isEmpty(username)) {
    result.errors.push('Username is required');
    return result;
  }

  if (username.length < 3) {
    result.errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 20) {
    result.errors.push('Username must be no more than 20 characters long');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    result.errors.push(
      'Username can only contain letters, numbers, and underscores'
    );
  }

  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Validate required fields in a form
 * @param {object} data - Form data to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (isEmpty(data[field])) {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate game move (generic)
 * @param {*} move - Move data to validate
 * @param {object} gameState - Current game state
 * @param {function} isValidMove - Function to check if move is valid
 * @returns {object} Validation result
 */
export const validateGameMove = (move, gameState, isValidMove) => {
  const result = {
    isValid: false,
    error: null,
  };

  if (isEmpty(move)) {
    result.error = 'Move cannot be empty';
    return result;
  }

  if (gameState.status !== 'playing') {
    result.error = 'Game is not in playing state';
    return result;
  }

  if (!isValidMove(move, gameState)) {
    result.error = 'Invalid move';
    return result;
  }

  result.isValid = true;
  return result;
};

/**
 * Validate chess move
 * @param {object} move - Chess move object
 * @param {object} gameState - Current chess game state
 * @returns {object} Validation result
 */
export const validateChessMove = (move, gameState) => {
  const result = {
    isValid: false,
    error: null,
  };

  if (!move.from || !move.to) {
    result.error = 'Move must have from and to positions';
    return result;
  }

  // Add more chess-specific validations here
  result.isValid = true;
  return result;
};

/**
 * Validate card game move
 * @param {object} move - Card move object
 * @param {object} gameState - Current card game state
 * @returns {object} Validation result
 */
export const validateCardMove = (move, gameState) => {
  const result = {
    isValid: false,
    error: null,
  };

  if (!move.card) {
    result.error = 'Must specify a card';
    return result;
  }

  if (!gameState.availableCards.includes(move.card)) {
    result.error = 'Card is not available';
    return result;
  }

  result.isValid = true;
  return result;
};

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = input => {
  if (typeof input !== 'string') return input;

  return (
    input
      .trim()
      // Remove script tags and their content entirely
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove any other HTML tags
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/['"]/g, '') // Remove quotes
      .substring(0, 1000)
  ); // Limit length
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  } = options;

  const result = {
    isValid: false,
    errors: [],
  };

  if (!file) {
    result.errors.push('No file selected');
    return result;
  }

  if (file.size > maxSize) {
    result.errors.push(
      `File size must be less than ${maxSize / 1024 / 1024}MB`
    );
  }

  if (!allowedTypes.includes(file.type)) {
    result.errors.push(`File type ${file.type} is not allowed`);
  }

  result.isValid = result.errors.length === 0;
  return result;
};

export default {
  isEmpty,
  isValidEmail,
  validatePassword,
  validateUsername,
  validateRequiredFields,
  validateGameMove,
  validateChessMove,
  validateCardMove,
  sanitizeInput,
  validateFileUpload,
};
