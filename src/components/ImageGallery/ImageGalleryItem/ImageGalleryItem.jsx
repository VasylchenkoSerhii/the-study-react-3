import React from 'react';

export default function ImageGalleryItem({ items, toggleModal}) {
    return (
        items.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
                <img
                    className="ImageGalleryItem-image"
                    src={webformatURL}
                    alt={tags}
                    onClick={()=> toggleModal(largeImageURL, tags)}
                />
            </li>
        ))
    );
};
