/* eslint-disable no-undef */

/***
 * Sentry Manager
 */
class SentryManager {
    /***
     * Class constructor
     */
    constructor(debug = true) {
        const env = debug === true ? 'development' : 'production';

        console.log('Init Sentry', env);

        // Sentry.onLoad(() => {
        //     Sentry.init({
        //         dsn: 'https://21ee1510d38c4e8ea55e5d36183a85c7@o658380.ingest.sentry.io/5763656',
        //         integrations: [new Sentry.Integrations.BrowserTracing()],
        //         tracesSampleRate: 0.1,
        //         environment: env,
        //         debug: false
        //     });
        // });
    }

    /***
     * Capture exception
     * @param {Error} err - error
     */
    captureException(err) {
        // Sentry.captureException(err);
    }

    /***
     * Capture message
     * @param {string} msg - message
     */
    captureMessage(msg) {
        // Sentry.captureMessage(msg);
    }
}

export const sentryManager = new SentryManager(process.env.DEBUG);