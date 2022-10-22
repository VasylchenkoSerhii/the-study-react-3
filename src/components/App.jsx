import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import * as API from '../services/api';

export default class App extends Component {

  state = {
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    isModalOpen: false,
    modalContent: {
      tags: "",
      largeImageURL: "",
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page } = this.state;
    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const items = await API.getImages(query, page);
        this.setState(prev => ({
          images: [...prev.images, ...items.hits],
          isLoading: !prev.isLoading
        }));
      } catch (error) {
        console.log(error)
      };
    };
  };
  

  handleSubmit = async values => {
    const { page } = this.state;
    this.setState({ isLoading: true });
    try {
      const images = await API.getImages(values, page);
      this.setState({ images: images.hits, query: values, page: 1, isLoading: false });
    } catch (error) {
      console.log(error);
    };
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ isModalOpen: true, modalContent: {tags, largeImageURL} });
    console.log(this.state.modalContent)
  };

  render() {
    const { images, isLoading, isModalOpen, modalContent } = this.state;
    const { handleSubmit, handleClick } = this;

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        {images.length !== 0 && <ImageGallery openModal={this.openModal} images={images} />}
        {images.length !== 0 && <Button onClick={handleClick} />}
        {isLoading && <Loader />}
        {isModalOpen && <Modal><img src={modalContent.largeImageURL} alt={modalContent.tags} /></Modal>}
      </>
    );
  }
};

