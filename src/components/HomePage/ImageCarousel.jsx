import { useState, useEffect } from "react";
import study1 from "../Images/study1.jpg";
import study2 from "../Images/study2.jpg";
import study3 from "../Images/study3.jpg";
import study4 from "../Images/study4.jpg";
import study5 from "../Images/study5.jpg";

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [study1, study2, study3, study4, study5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="max-w-full max-h-96 aspect-w-3 aspect-h-2">
        <div className="h-72">
          <img
            src={images[currentImage]}
            alt="Carousel Image"
            className="object-center object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
