import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React, { FC, Suspense } from 'react';
import packageJson from '../package.json';
import App from './App';
import ErrorFallback from './components/error-fallback/ErrorFallback';
import Loading from './components/loading/Loading';
import './i18n';

Sentry.init({
  // this turns off sentry for everything but production
  dsn:
    process.env.NODE_ENV === 'production'
      ? 'https://e090fb4038584bd7a40ea8b9ce981213@o508541.ingest.sentry.io/5601190'
      : '',
  autoSessionTracking: true,
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  release: packageJson.version,
  tracesSampleRate: 0.5,
});

/** A component to put any wrappers for the application such as a main sentry error boundary. */
const AppWrapper: FC = () => {
  return (
    // Error boundary to catch any errors at the highest level.
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog={true}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Sentry.ErrorBoundary>
  );
};

export default AppWrapper;
