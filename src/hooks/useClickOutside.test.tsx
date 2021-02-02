import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FC, useRef } from 'react';
import useClickOutside from './useClickOutside';

/** A component just to test this hook. */
const TestComponent: FC<{
  parentFn: () => void;
  childFn: () => void;
}> = ({ parentFn, childFn }) => {
  const parentRef = useRef<HTMLDivElement>();
  const childRef = useRef<HTMLDivElement>();

  useClickOutside(parentRef, true, parentFn);
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
};

describe('useClickOutside', () => {
  test('it calls the function when a sibling is clicked', () => {
    const parentFn = jest.fn();
    render(<TestComponent parentFn={parentFn} childFn={jest.fn()} />);

    userEvent.click(screen.getByText(/^Sibling$/));
    expect(parentFn).toHaveBeenCalledTimes(1);
  });

  test('it calls the function when a parent is clicked', () => {
    const childFn = jest.fn();
    render(<TestComponent parentFn={jest.fn()} childFn={childFn} />);

    userEvent.click(screen.getByText(/^Parent$/));
    expect(childFn).toHaveBeenCalledTimes(1);
  });

  test("it doesn't call the function when the element is clicked", () => {
    const parentFn = jest.fn();
    render(<TestComponent parentFn={parentFn} childFn={jest.fn()} />);

    userEvent.click(screen.getByText(/^Parent$/));
    expect(parentFn).not.toHaveBeenCalled();
  });

  test("it doesn't call the function when the a child is clicked", () => {
    const parentFn = jest.fn();
    render(<TestComponent parentFn={parentFn} childFn={jest.fn()} />);

    userEvent.click(screen.getByText(/^Child$/));
    expect(parentFn).not.toHaveBeenCalled();
  });
});
