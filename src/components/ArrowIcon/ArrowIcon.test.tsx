import { render } from '@testing-library/react';
import { ArrowIcon } from './ArrowIcon';
import { describe, expect, it } from 'vitest';

describe('ArrowIcon', () => {
  it('should render without crashing', () => {
    const { container } = render(<ArrowIcon />);
    expect(container).toBeInTheDocument();
  });

  it('should render an SVG element', () => {
    const { getByRole } = render(<ArrowIcon />);
    const svgElement = getByRole('img');
    expect(svgElement).toBeInTheDocument();
  });

  it('should have the correct class', () => {
    const { container } = render(<ArrowIcon />);
    const iElement = container.querySelector('i');
    expect(iElement).toHaveClass('arrow-icon');
  });

  it('should render the SVG path correctly', () => {
    const { container } = render(<ArrowIcon />);
    const pathElement = container.querySelector('path');
    expect(pathElement).toHaveAttribute(
      'd',
      'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
    );
  });
});
