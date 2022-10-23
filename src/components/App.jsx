import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export default class App extends Component {

  state = {
    query: "",
    page: 1,
    isModalOpen: false,
    modalContent: {
      tags: "",
      largeImageURL: "",
    }
  };
  

  handleSubmit = async query => {
    this.setState({ query });
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
    const { isModalOpen, modalContent } = this.state;
    const { query, page } = this.state;
    const { handleSubmit, openModal, closeModal } = this;
    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery openModal={openModal} query={query} page={page} />
        {query && <Button onClick={this.handleClick}/>}
        {isModalOpen && <Modal onClose={closeModal} >
          <img className="Modal-img" src={modalContent.largeImageURL} alt={modalContent.tags} />
        </Modal>}
      </>
    );
  }
};

