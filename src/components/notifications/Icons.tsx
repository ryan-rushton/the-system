import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icons.module.scss';

/** Error icon for notifications. */
export function ErrorIcon() {
  return (
    <div data-testid="error-icon" className={styles.icon}>
      <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
    </div>
  );
}

/** Warning icon for notifications. */
export function WarningIcon() {
  return (
    <div data-testid="warning-icon" className={styles.icon}>
      <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
    </div>
  );
}

/** Info icon for notifications. */
export function InfoIcon() {
  return (
    <div data-testid="info-icon" className={styles.icon}>
      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
    </div>
  );
}

/** Success icon for notifications. */
export function SuccessIcon() {
  return (
    <div data-testid="success-icon" className={styles.icon}>
      <FontAwesomeIcon icon={faCheckCircle} size="lg" />
    </div>
  );
}
