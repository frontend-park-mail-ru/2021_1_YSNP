/* eslint-disable no-undef */

/***
 * Sentry Manager
 */
class SentryManager {
    /***
     * Class constructor
     */
    constructor(debug = true) {
        this.__debug = debug;
        const env = debug === true ? 'development' : 'production';

        if (this.__debug) {
            return;
        }

        console.log('Init Sentry', env);

        Sentry.onLoad(() => {
            Sentry.init({
                dsn: 'https://21ee1510d38c4e8ea55e5d36183a85c7@o658380.ingest.sentry.io/5763656',
                integrations: [new Sentry.Integrations.BrowserTracing()],
                tracesSampleRate: 0.2,
                environment: env,
                debug: false
            });
        });
    }

    /***
     * Capture exception
     * @param {Error} err - error
     */
    captureException(err) {
        if (this.__debug) {
            return;
        }

        Sentry.captureException(err);

    }

    /***
     * Capture message
     * @param {string} msg - message
     */
    captureMessage(msg) {
        if (this.__debug) {
            return;
        }

        Sentry.captureMessage(msg);

    }
}

export const sentryManager = new SentryManager(false);