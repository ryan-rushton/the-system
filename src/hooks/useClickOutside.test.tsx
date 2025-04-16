import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

/** A component just to test this hook. */
function TestComponent({
  parentEnabled,
  parentFn,
  childFn,
}: Readonly<{
  parentEnabled: boolean;
  parentFn: () => void;
  childFn: () => void;
}>) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(parentRef, parentEnabled, parentFn);
  useClickOutside(childRef, true, childFn);

  return (
    <div>
      <div ref={parentRef}>
        {'Parent'}
        <div ref={childRef}>{'Child'}</div>
      </div>
      <div>{'Sibling'}</div>
    </div>
  );
}

describe('useClickOutside', () => {
  test('it calls the function when a sibling is clicked', async () => {
    const parentFn = vi.fn();
    render(<TestComponent parentEnabled={true} parentFn={parentFn} childFn={vi.fn()} />);

    await userEvent.click(screen.getByText(/^Sibling$/));
    expect(parentFn).toHaveBeenCalledTimes(1);
  });

  test('it calls the function when a parent is clicked', async () => {
    const childFn = vi.fn();
    render(<TestComponent parentEnabled={true} parentFn={vi.fn()} childFn={childFn} />);

    await userEvent.click(screen.getByText(/^Parent$/));
    expect(childFn).toHaveBeenCalledTimes(1);
  });

  test("it doesn't call the function when the element is clicked", async () => {
    const parentFn = vi.fn();
    render(<TestComponent parentEnabled={true} parentFn={parentFn} childFn={vi.fn()} />);

    await userEvent.click(screen.getByText(/^Parent$/));
    expect(parentFn).not.toHaveBeenCalled();
  });

  test("it doesn't call the function when the a child is clicked", async () => {
    const parentFn = vi.fn();
    render(<TestComponent parentEnabled={true} parentFn={parentFn} childFn={vi.fn()} />);

    await userEvent.click(screen.getByText(/^Child$/));
    expect(parentFn).not.toHaveBeenCalled();
  });

  test("it doesn't call the function when it is disabled", async () => {
    const parentFn = vi.fn();
    render(<TestComponent parentEnabled={false} parentFn={parentFn} childFn={vi.fn()} />);

    await userEvent.click(screen.getByText(/^Parent$/));
    expect(parentFn).not.toHaveBeenCalled();
  });
});
