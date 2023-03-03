import { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchImages } from '../../services/fetch';
import { Gallery, ErrorMessage } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  ERROR: 'error',
  SUCCESS: 'success',
};

export class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    isLoading: false,
    isMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;

    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({
        isLoading: true,
      });

      try {
        const data = await fetchImages(query, page);
        console.log(data);

        if (page === 1) {
          this.setState({
            images: [...data.hits],
            status: Status.SUCCESS,
            isMore: data.hits.length === 12,
          });
        } else {
          this.setState({
            images: [...prevState.images, ...data.hits],
            status: Status.SUCCESS,
            isMore: data.hits.length === 12,
          });
        }
      } catch (error) {
        this.setState({
          status: Status.ERROR,
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
    const { status, images, isLoading, isMore } = this.state;

    return (
      <div>
        {isLoading && <Loader visible={isLoading} />}
        {status === 'success' && (
          <Gallery>
            {images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </Gallery>
        )}
        {status === 'error' && (
          <ErrorMessage>
            Sorry, something went wrong. Please, again
          </ErrorMessage>
        )}
        {isMore && <Button onClick={this.props.handleCilck} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
