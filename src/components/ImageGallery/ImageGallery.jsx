import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem
                items={images}
            />
        </ul>
    );
};
