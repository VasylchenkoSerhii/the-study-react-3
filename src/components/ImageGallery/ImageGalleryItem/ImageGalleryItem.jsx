import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {

    state = {
        isModalOpen: false,
    };

    toggelModal = () => {
        this.setState(prev => ({
            isModalOpen: !prev.isModalOpen
        }));
    };

    render() {
        const { id, webformatURL, tags, largeImageURL } = this.props;
        const { toggelModal } = this;
        const { isModalOpen } = this.state;
        return (
            <>
                <li className="ImageGalleryItem" key={id}>
                    <img
                        className="ImageGalleryItem-image"
                        src={webformatURL}
                        alt={tags}
                        onClick={toggelModal}
                    />
                </li>
                {isModalOpen && <Modal toggleModal={toggelModal}>
                    <img className="Modal-img" src={largeImageURL} alt={tags} />
                </Modal>}
            </>
        );
  }
}



