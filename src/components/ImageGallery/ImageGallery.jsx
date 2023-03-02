import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchImages } from '../../services/fetch';
import { Gallery, ErrorMessage } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    response: null,
    error: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({
        isLoading: true,
      });
      try {
        const data = await fetchImages(query);
        console.log(data);
        this.setState({
          response: data,
          error: false,
        });
      } catch (error) {
        this.setState({
          error: true,
        });
        console.log(error);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { response, error, isLoading } = this.state;

    return (
      <>
        {isLoading && <Loader visible={isLoading} />}
        {response && !error && (
          <Gallery>
            {response.hits.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </Gallery>
        )}
        {error && (
          <ErrorMessage>
            Sorry, something went wrong. Please, again
          </ErrorMessage>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
