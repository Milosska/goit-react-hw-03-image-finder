import { Component } from 'react';
import { GlobalStyles } from './GlobalStyles';
import 'modern-normalize';
import { fetchImages } from '../services/fetch';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// const Status = {
//   IDLE: 'idle',
//   LOADING: 'loading',
//   ERROR: 'error',
// };

export class App extends Component {
  state = {
    status: 'idle',
    query: '',
    images: [],
  };

  handleSubmit = ({ query }, { resetForm }) => {
    this.setState({ query });
    resetForm();
  };

  async componentDidUpdate(_, prevState) {
    const { query } = this.state;

    if (prevState.query !== this.state.query) {
      try {
        const images = await fetchImages(query);
        console.log(images);
        this.setState({
          images: images.hits,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        <GlobalStyles />
      </div>
    );
  }
}
