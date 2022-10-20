import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
    const { hits } = images;
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem
                items={hits}
            />
        </ul>
    );
};
