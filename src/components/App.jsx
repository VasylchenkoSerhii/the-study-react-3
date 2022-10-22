import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import * as API from '../services/api';

export default class App extends Component {

  state = {
    images: null,
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
      if (images.hits.length === 0) {
        this.setState({ isLoading: false });
        return;
      };
      this.setState({ images: images, query: values, page: 1, isLoading: false });
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
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isLoading, isModalOpen, modalContent } = this.state;
    const { handleSubmit, handleClick, openModal, closeModal } = this;
    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        {images && <ImageGallery openModal={openModal} images={images} />}
        {images && <Button onClick={handleClick} />}
        {isLoading && <Loader />}
        {isModalOpen && <Modal onClose={closeModal} >
          <img className="Modal-img" src={modalContent.largeImageURL} alt={modalContent.tags} />
        </Modal>}
      </>
    );
  }
};

