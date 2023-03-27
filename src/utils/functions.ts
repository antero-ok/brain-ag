/**
 * Returns sanitized string
 * @param {string} value String whose accents will be removed
 * @returns {string} String without any special characters
 *
 * @example
 * sanitizeString('àéîõü')
 * // aeiou
 */

export const sanitizeString = (value: string) => {
  return value?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
