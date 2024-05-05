import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './CloseButton.module.scss';

const Path = ({ d }: { d: string }) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="#fefefe" strokeLinecap="round" d={d} />
);

interface Props {
  /** A function to be called when the close icon is clicked. */
  onClose(): void;
}

/**
 * A button that creates a close icon for the notifications. Extracted to it's own component so we can
 * isolate the svg creation.
 */
const CloseButton: FC<Props> = ({ onClose }) => (
  <button data-testid="close-button" onClick={onClose} className={styles.close}>
    <svg width="12" height="12" viewBox="0 0 12 12">
      <Path d="M 1 1 L 11 11" />
      <Path d="M 1 11 L 11 1" />
    </svg>
  </button>
);

export default CloseButton;
