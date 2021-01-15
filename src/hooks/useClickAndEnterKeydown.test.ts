import { renderHook, act } from '@testing-library/react-hooks';

import useClickAndEnterKeyDown from './useClickAndEnterKeydown';

describe('useClickAndEnterKeyDown', () => {
  test('it calls the callback correctly with click', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickAndEnterKeyDown(callback));
    const [onClick] = result.current;

    act(() => onClick());

    expect(callback).toBeCalledTimes(1);
  });

  test('it calls the callback correctly with enter', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickAndEnterKeyDown(callback));
    const [ignored, onEnter] = result.current;

    act(() => onEnter({ key: 'Enter' }));

    expect(callback).toBeCalledTimes(1);
  });
});
