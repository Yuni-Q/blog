import React, { useEffect } from 'react';

function ImageGallery({ images }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entires) => {
        entires.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '0px 0px 100px 0px',
      },
    );
    const lazyImages = document.querySelectorAll('.lazy');

    lazyImages.forEach((image) => {
      observer.observe(image);
    });
  }, []);

  return (
    <div style={{ width: 600 }}>
      {images.map((image) => {
        return (
          <img
            key={image}
            className="lazy"
            data-src={image}
            width={200}
            height={200}
          />
        );
      })}
    </div>
  );
}

export default ImageGallery;
