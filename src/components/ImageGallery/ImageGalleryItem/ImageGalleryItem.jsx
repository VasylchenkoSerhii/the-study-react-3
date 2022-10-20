import React from 'react';

export default function ImageGalleryItem({items}) {
    return (
        items.map(({ id, webformatURL, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
                <img className="ImageGalleryItem-image" src={webformatURL} />
            </li>
        ))
    );
};
