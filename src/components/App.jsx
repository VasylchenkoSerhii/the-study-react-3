import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import * as API from '../services/api';

export default class App extends Component {

  state = {
    images: [],
    query: "",
    page: 1,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page } = this.state;
    if (prevState.page !== page) {
      try {
        const items = await API.getImages(query, page);
        this.setState(prev => ({
          images: [...prev.images, ...items.hits]
        }));
      } catch (error) {
        console.log(error)
      };
    };
  };
  

  handleSubmit = async values => {
    const { page } = this.state;
    try {
      const images = await API.getImages(values, page);
      this.setState({ images: images.hits, query: values, page: 1 });
    } catch (error) {
      console.log(error);
    };
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  render() {
    const { images } = this.state;
    const { handleSubmit, handleClick } = this;
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {images.length !== 0 && <Button onClick={handleClick} />}
      </div>
    );
  }
};

