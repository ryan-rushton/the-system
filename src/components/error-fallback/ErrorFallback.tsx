import { useTranslation } from 'react-i18next';
import styles from './ErrorFallback.module.scss';

/** An error fallback component for Sentry. This takes up the whole page so only use it when that is intended */
export function ErrorFallback() {
  const { t } = useTranslation();
  return <div className={styles.fallback}>{t('systemFailedToLoad')}</div>;
}
