/**
 * Enum for all translation keys used in the application
 * This provides type safety and autocompletion when using the t() function
 */
export enum TranslationKey {
  APP_TITLE = 'app_title',
  WELCOME = 'welcome',
  DESCRIPTION = 'description',
  QUICK_ACTIONS = 'quick_actions',
  DASHBOARD = 'dashboard',
  BOOKINGS = 'bookings',
  ROOMS = 'rooms',
  GUESTS = 'guests',
  SYSTEM_STATS = 'system_stats',
  TOTAL_ROOMS = 'total_rooms',
  OCCUPIED_ROOMS = 'occupied_rooms',
  AVAILABLE_ROOMS = 'available_rooms',
  MAINTENANCE = 'maintenance',
  FOOTER = 'footer',
  TOGGLE_THEME = 'toggle_theme',
  
  // Login related keys
  LOGIN = 'login',
  USERNAME = 'username',
  PASSWORD = 'password',
  USERNAME_REQUIRED = 'username_required',
  PASSWORD_REQUIRED = 'password_required',
  REMEMBER_ME = 'remember_me',
  FORGOT_PASSWORD = 'forgot_password',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  DEMO_CREDENTIALS = 'demo_credentials'
}