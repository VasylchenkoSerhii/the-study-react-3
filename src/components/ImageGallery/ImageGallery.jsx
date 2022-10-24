import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, toggleModal }) {
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem
                items={images}
                toggleModal={toggleModal}
            />
        </ul>
    );
};
