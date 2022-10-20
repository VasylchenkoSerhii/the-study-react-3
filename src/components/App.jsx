import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import * as API from '../services/api';

export default class App extends Component {

  state = {
    images: [],
  };

  handleSubmit = async values => {
    try {
      const images = await API.getImages(values);
      this.setState({ images });
    } catch (error) {
      console.log(error);
    };
  };

  render() {
    const { images } = this.state;
    const { handleSubmit } = this;
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {images.length !== 0 && <Button />}
      </div>
    );
  }
};

