import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
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
    const { handleSubmit } = this;
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }
};

