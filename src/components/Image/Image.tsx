import { FC } from 'react';
import './Image.scss';

interface Props {
  alt: string;
  src: string;
  title: string;
}

export const Image: FC<Props> = ({ alt, src, title }) => {
  return (
    <figure className="caption-overlay">
      <div className="image-wrapper" style={{ paddingBottom: '56.25%' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="image-element"
          aria-hidden="true"
        />
      </div>
      <figcaption className="caption">
        <span className="caption-title">{title}</span>
      </figcaption>
    </figure>
  );
};
