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

/**
 * Returns formatted number
 * @param {number} value Value to be formatted
 * @returns {string} String formatted to Brazilian standards
 *
 * @example
 * formatLongNumber(1000.45)
 * // 1.000,45
 */
export const formatLongNumber = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
