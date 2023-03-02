import { Component } from 'react';
import { GlobalStyles } from './GlobalStyles';
import 'modern-normalize';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = ({ query }, { resetForm }) => {
    this.setState({ query });
    resetForm();
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.query} />
        <GlobalStyles />
      </div>
    );
  }
}
