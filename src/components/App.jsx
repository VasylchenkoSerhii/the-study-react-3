import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
        const images = await API.getImages(query, page);
        this.setState(prev => ({
          images: [...prev.images, ...images.hits],
          isLoading: false
        }));
        
      } catch (error) {
        console.log(error)
      };
    };
  };
  

  handleSubmit = async query => {
    const { page } = this.state;
    this.setState({ isLoading: true });
    try {
      const images = await API.getImages(query, page);
      if (images.hits.length === 0) {
        toast(`По вашому запросу не знайдено жодного фото`);
        this.setState({ isLoading: false });
        return;
      }
      this.setState({ images: images.hits, query, page: 1, isLoading: false });
      toast(`Знайдено ${images.totalHits} фото`)
    } catch (error) {
      console.log(error);
    };
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(prev =>({ modalContent: {tags, largeImageURL} }));
  };

  render() {
    const { images, modalContent, isLoading } = this.state;
    const { handleSubmit, handleClick, toggleModal } = this;

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        {images && <>
            <ImageGallery toggleModal={toggleModal} images={images} />
            <Button onClick={handleClick} />
        </>}
        {isLoading && <Loader />}
        {modalContent.tags && <Modal toggleModal={toggleModal}>
              <img className="Modal-img" src={modalContent.largeImageURL} alt={modalContent.tags} />
        </Modal>}
        <ToastContainer position="top-right"/>
        </>
    )

    // if (status === "idle") {
    //   return (
    //     <>
    //       <Searchbar onSubmit={handleSubmit} />
    //       <ToastContainer position="top-right"/>
    //     </>
    //   )
    // };

    // if (status === "pending") {
    //   return (
    //     <>
    //       <Searchbar onSubmit={handleSubmit} />
    //       <ImageGallery toggleModal={toggleModal} images={images} />
    //       <Loader />
    //     </>
    //   )
    // };

    // if (status === "resolved") {
    //   return (
    //     <>
    //       <Searchbar onSubmit={handleSubmit} />
    //       <ImageGallery toggleModal={toggleModal}  images={images} />
    //       <Button onClick={handleClick} />
    //       {modalContent.tags && <Modal toggleModal={toggleModal}>
    //         <img className="Modal-img" src={modalContent.largeImageURL} alt={modalContent.tags} />
    //       </Modal>}
    //       <ToastContainer position="top-right"/>
    //     </>
    //   )
    // };
  }
};

