import { motion } from 'framer-motion';
import styles from './CloseButton.module.scss';

function Path({ d }: Readonly<{ d: string }>) {
  return <motion.path fill="transparent" strokeWidth="3" stroke="#fefefe" strokeLinecap="round" d={d} />;
}

/**
 * A button that creates a close icon for the notifications. Extracted to it's own component so we can
 * isolate the svg creation.
 */
export function CloseButton({
  onClose,
}: Readonly<{
  /** A function to be called when the close icon is clicked. */
  onClose(): void;
}>) {
  return (
    <button data-testid="close-button" onClick={onClose} className={styles.close}>
      <svg width="12" height="12" viewBox="0 0 12 12">
        <Path d="M 1 1 L 11 11" />
        <Path d="M 1 11 L 11 1" />
      </svg>
    </button>
  );
}
