import { useState } from 'react';

const useImagesSlider = (initialImages) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === initialImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const showPrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? initialImages.length - 1 : prevIndex - 1
        );
    };

    return {
        currentImageIndex,
        showNextImage,
        showPrevImage,
    };
};

export default useImagesSlider;
