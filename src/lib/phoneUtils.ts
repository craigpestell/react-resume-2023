/**
 * Utility functions for handling phone number display and obfuscation
 */

/**
 * Obfuscates a phone number by replacing middle digits with dots
 * @param phone - The phone number to obfuscate
 * @param showDigits - Number of digits to show at start and end (default: 3)
 * @returns Obfuscated phone number
 */
export function obfuscatePhoneNumber(phone: string, showDigits: number = 3): string {
  if (!phone) return '';
  
  // Remove all non-digit characters to work with just numbers
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < showDigits * 2) {
    // If phone is too short, obfuscate differently
    return phone.replace(/\d/g, '•').slice(0, phone.length);
  }
  
  // Keep the original formatting structure but replace middle digits
  let result = '';
  let digitCount = 0;
  
  for (let i = 0; i < phone.length; i++) {
    const char = phone[i];
    if (/\d/.test(char)) {
      digitCount++;
      if (digitCount <= showDigits || digitCount > digitsOnly.length - showDigits) {
        result += char;
      } else {
        result += '•';
      }
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Creates a click-to-reveal phone number component data
 * @param phone - The original phone number
 * @returns Object with obfuscated and original phone numbers
 */
export function createRevealablePhone(phone: string) {
  return {
    obfuscated: obfuscatePhoneNumber(phone),
    original: phone,
    telLink: `tel:${phone.replace(/\D/g, '')}`
  };
}

/**
 * Formats phone number for display (removes country code for display)
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return '';
  
  // Remove +1 country code for US numbers if present
  const cleaned = phone.replace(/^\+1\s*/, '');
  
  return cleaned;
}
