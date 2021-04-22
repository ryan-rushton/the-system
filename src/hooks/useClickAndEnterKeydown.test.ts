import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import useClickAndEnterKeyDown from './useClickAndEnterKeydown';

describe('useClickAndEnterKeyDown', () => {
  afterEach(cleanup);

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
    const [_ignored, onEnter] = result.current;

    act(() => onEnter({ key: 'Enter' }));

    expect(callback).toBeCalledTimes(1);
  });
});
