import React, { FC } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';
import ErrorFallback from './components/ErrorFallback';
import packageJson from '../package.json';

import './i18n';

Sentry.init({
  dsn: process.env.production && 'https://e090fb4038584bd7a40ea8b9ce981213@o508541.ingest.sentry.io/5601190',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  release: packageJson.version,
  tracesSampleRate: 0.5,
});

/** A component to put any wrappers for the application such as a main sentry error boundary. */
const AppWrapper: FC = () => {
  return (
    // Error boundary to catch any errors at the highest level.
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog={true}>
      <App />
    </Sentry.ErrorBoundary>
  );
};

export default AppWrapper;
