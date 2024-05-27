import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Image } from './Image';
import { describe, expect, it } from 'vitest';

describe('Image component', () => {
  it('renders the image with the correct attributes', () => {
    const altText = 'Test Alt Text';
    const src = 'test-image.jpg';
    const title = 'Test Title';

    render(<Image alt={altText} src={src} title={title} />);

    const imgElement = screen.getByRole('img', { hidden: true });
    expect(imgElement).toHaveAttribute('src', src);
    expect(imgElement).toHaveAttribute('alt', altText);
    expect(imgElement).toHaveAttribute('loading', 'lazy');
    expect(imgElement).toHaveClass('image-element');
  });

  it('renders the caption with the correct title', () => {
    const altText = 'Test Alt Text';
    const src = 'test-image.jpg';
    const title = 'Test Title';

    render(<Image alt={altText} src={src} title={title} />);

    const captionElement = screen.getByText(title);
    expect(captionElement).toBeInTheDocument();
    expect(captionElement).toHaveClass('caption-title');
  });

  it('applies the correct container classes', () => {
    const altText = 'Test Alt Text';
    const src = 'test-image.jpg';
    const title = 'Test Title';

    render(<Image alt={altText} src={src} title={title} />);

    const figureElement = screen.getByRole('figure');
    expect(figureElement).toHaveClass('caption-overlay');
  });

  it('applies the correct styles to the image wrapper', () => {
    const altText = 'Test Alt Text';
    const src = 'test-image.jpg';
    const title = 'Test Title';

    render(<Image alt={altText} src={src} title={title} />);

    const imageWrapper = screen.getByRole('img', {
      hidden: true,
    }).parentElement;
    expect(imageWrapper).toHaveStyle('paddingBottom: 56.25%');
    expect(imageWrapper).toHaveClass('image-wrapper');
  });
});
