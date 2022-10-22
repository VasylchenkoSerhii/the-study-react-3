import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, openModal }) {
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem
                items={images}
                openModal={openModal}
            />
        </ul>
    );
};
