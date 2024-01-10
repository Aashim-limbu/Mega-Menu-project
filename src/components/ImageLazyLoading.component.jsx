import React, { useState } from "react";

const LazyImage = ({ imageLow, imageHigh, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <img
        src={imageLow}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: imageLoaded ? "blur(0)" : "blur(20px)",
          transition: "filter 0.3s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onLoad={handleImageLoaded}
      />
      {imageLoaded && (
        <img
          src={imageHigh}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          onLoad={(e) => {
            e.target.style.opacity = 1;
          }}
        />
      )}
    </>
  );
};

export default LazyImage;
