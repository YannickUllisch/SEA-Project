/**
 * An array of routes publicly accesible.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/survey', '/auth/login', '/survey_builder']

/**
 * DEFAULT redirect path for admins after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/overview'
