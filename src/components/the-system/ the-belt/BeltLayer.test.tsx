import { render, screen } from '@testing-library/react';
import React from 'react';

import BeltLayer from './BeltLayer';

describe('BeltLayer', () => {
  test('it renders without the scroll to ref', () => {
    render(<BeltLayer innerBoundary={100} outerBoundary={200} />);
    expect(screen.getAllByTestId('belt-rock').length).toBe(7_500);
    expect(screen.queryByTestId('belt-ref')).not.toBeInTheDocument();
  });

  test('it renders the ref object when the ref is passed in', () => {
    render(<BeltLayer innerBoundary={100} outerBoundary={200} scrollToRef={React.createRef()} />);
    expect(screen.getByTestId('belt-ref')).toBeInTheDocument();
  });
});
