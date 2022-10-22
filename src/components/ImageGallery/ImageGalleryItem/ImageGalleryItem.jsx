import React from 'react';

export default function ImageGalleryItem({ items, openModal}) {
    return (
        items.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
                <img
                    className="ImageGalleryItem-image"
                    src={webformatURL}
                    alt={tags}
                    onClick={()=> openModal(largeImageURL, tags)}
                />
            </li>
        ))
    );
};
