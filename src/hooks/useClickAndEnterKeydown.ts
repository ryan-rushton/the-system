import { KeyboardEvent, useCallback } from 'react';

/**
 * Provides memoized functions that will activate onClick and on Enter Keydown.
 * @param callback The callback fired on enter keydown or click.
 */
const useClickAndEnterKeyDown = (callback: () => void): [() => void, (event: KeyboardEvent<HTMLElement>) => void] => {
  const onClick = useCallback(callback, [callback]);
  const onEnter = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        callback();
      }
    },
    [callback]
  );

  return [onClick, onEnter];
};

export default useClickAndEnterKeyDown;
