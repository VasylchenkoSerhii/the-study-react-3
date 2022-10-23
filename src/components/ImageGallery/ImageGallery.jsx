import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import * as API from '../../services/api';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        status: "idle",
    };

    componentDidUpdate = async (prevProps, prevState) => {
        const { page } = this.state;
        const prevImages = prevProps.query;
        const nextImages = this.props.query;
        if (prevImages !== nextImages) {
            this.setState({ status: "pending" });
            try {
                const images = await API.getImages(nextImages, page);
                this.setState({ images: images.hits, status: "resolved" });
            } catch (error) {
                console.log(error);
            };
        };

        if (prevState.page !== page) {
            try {
                const items = await API.getImages(prevImages, page); 
                this.setState(prev => ({
                    images: [...prev.images, ...items.hits],
                }));
            } catch (error) {
                console.log(error);
            };
        };
    };

    handleClick = () => {
        this.setState(prevState => ({
        page: prevState.page + 1
        }));
    };
    
    render() {
        const { openModal } = this.props;
        const { images, status } = this.state;

        if (status === "idle") {
            return;
        };

        if (status === "pending") {
            return <Loader />
        };

        if (status === "resolved") {
            return (
                <>
                    <ul className="ImageGallery">
                        <ImageGalleryItem
                        items={images}
                        openModal={openModal}
                        />
                    </ul>
                    <Button onClick={this.handleClick}/>
                </>
            )
        }
        return (
            <ul className="ImageGallery">
                <ImageGalleryItem
                    items={images}
                    openModal={openModal}
                />
            </ul>
        );
  }
};
