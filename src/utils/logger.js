// Logger Utility - Replaces console statements with environment-aware logging
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
    log: (...args) => {
        if (isDevelopment) {
            console.log('[LOG]', ...args);
        }
    },
    error: (...args) => {
        // Always log errors, but format them properly
        console.error('[ERROR]', ...args);
    },
    warn: (...args) => {
        if (isDevelopment) {
            console.warn('[WARN]', ...args);
        }
    },
    info: (...args) => {
        if (isDevelopment) {
            console.info('[INFO]', ...args);
        }
    },
    debug: (...args) => {
        if (isDevelopment) {
            console.debug('[DEBUG]', ...args);
        }
    }
};

export default logger;

