/**
 * This file contains all the variables used for configuring environments.
 * It must be kept in '.js' because it is used by both webpack and full typescript app.
 * In the future we can look at migrating 'webpack.config.js' to 'webpack.config.ts'
 *
 * Read the README.md for more info on how this is setup
 */
const config = {
    LOGGER_LEVEL: `${process.env.LOGGER_LEVEL ?? 'info'}`,
    // Set 'true' to enable json "pretty" print (aka new line per each key with tabbing)
    LOGGER_PRINT_PRETTY_ENABLED:
        process.env.LOGGER_PRINT_PRETTY_ENABLED === 'true',
    // Set 'true' to log each request and its result
    LOGGER_AUTO_LOGGING_ENABLED:
        process.env.LOGGER_AUTO_LOGGING_ENABLED === 'true',
    // Set 'false' to include request information (such as headers and everything with each log message)
    // It will still include the reqId
    LOGGER_QUIET_REQ_LOGGER_ENABLED:
        process.env.LOGGER_QUIET_REQ_LOGGER_ENABLED === 'true',

    CORS_EXTRA_DOMAINS: process.env.CORS_EXTRA_DOMAINS
        ? process.env.CORS_EXTRA_DOMAINS.split(',')
        : [],

    OAUTH_COOKIE_SECRETS: process.env.OAUTH_COOKIE_SECRETS
        ? process.env.OAUTH_COOKIE_SECRETS.split(',')
        : [],
    OAUTH_COOKIE_PATH: `${process.env.OAUTH_COOKIE_PATH ?? '/'}`,
    OAUTH_COOKIE_DOMAIN: `${
        process.env.OAUTH_COOKIE_DOMAIN ?? 'http://localhost:8080'
    }`,
};

export { config };
