import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { isLocalImage, loadImage } from '../../lib/imageStore';

type StoredImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

/** Render either a public image URL or a photo loaded from IndexedDB. */
export function StoredImage({ src, alt, ...props }: StoredImageProps) {
  const [resolvedSource, setResolvedSource] = useState(
    isLocalImage(src) ? '' : src
  );

  useEffect(() => {
    if (!isLocalImage(src)) {
      setResolvedSource(src);
      return;
    }

    let active = true;
    let objectUrl: string | undefined;
    setResolvedSource('');

    loadImage(src)
      .then((blob) => {
        if (!active || !blob) return;
        objectUrl = URL.createObjectURL(blob);
        setResolvedSource(objectUrl);
      })
      .catch(() => {
        if (active) setResolvedSource('');
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (!resolvedSource) {
    return (
      <div
        role="img"
        aria-label={alt || 'Foto pa disponib'}
        className={`${props.className || ''} grid place-items-center bg-[#eaf0e8] text-xs text-[#78917b]`}
      >
        Foto pa disponib
      </div>
    );
  }

  return <img {...props} src={resolvedSource} alt={alt} />;
}
