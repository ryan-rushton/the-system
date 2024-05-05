import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, test } from 'vitest';
import BeltLayer from './BeltLayer';

describe('BeltLayer', () => {
  test('it renders without the scroll to ref', () => {
    render(<BeltLayer innerBoundary={100} outerBoundary={200} />);
    expect(screen.getAllByTestId('belt-rock').length).toBe(7_500);
    expect(screen.queryByTestId('belt-ref')).not.toBeInTheDocument();
  });

  test('it renders the ref object when the ref is passed in', () => {
    render(<BeltLayer innerBoundary={100} outerBoundary={200} scrollToRef={createRef()} />);
    expect(screen.getByTestId('belt-ref')).toBeInTheDocument();
  });
});
