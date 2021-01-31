import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import styles from './Icons.module.scss';

/** Error icon for notifications. */
export const Error: FC = () => (
  <div data-testid="error-icon" className={styles.icon}>
    <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
  </div>
);

/** Warning icon for notifications. */
export const Warning: FC = () => (
  <div data-testid="warning-icon" className={styles.icon}>
    <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
  </div>
);

/** Info icon for notifications. */
export const Info: FC = () => (
  <div data-testid="info-icon" className={styles.icon}>
    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
  </div>
);

/** Success icon for notifications. */
export const Success: FC = () => (
  <div data-testid="success-icon" className={styles.icon}>
    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
  </div>
);
