/**
 * Anonymous User ID Management
 * Generates and stores a unique anonymous ID in localStorage
 */

const USER_ID_KEY = 'digital_wellbeing_user_id';

/**
 * Get or create anonymous user ID
 */
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    // Generate a unique anonymous ID
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
}

/**
 * Clear user ID (for privacy/reset)
 */
export function clearAnonymousUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
  }
}

/**
 * Check if user has history
 */
export function hasUserHistory(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(USER_ID_KEY) !== null;
}
