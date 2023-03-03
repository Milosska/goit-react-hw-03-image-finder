import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../../services/fetch';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { TechError, QueryError, SuccessMessage } from '../Messages/Messages';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  Q_ERROR: 'query error',
  T_ERROR: 'technical error',
  SUCCESS: 'success',
};

export class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    isLoading: false,
    isMore: false,
    totalImg: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;

    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({
        isLoading: true,
      });

      try {
        const data = await fetchImages(query, page);
        this.setState({
          status: Status.SUCCESS,
          isMore: data.hits.length === 12,
        });

        // Перевірка на новий запит
        prevProps.query !== query
          ? this.setState({
              images: [...data.hits],
              totalImg: data.totalHits,
            })
          : this.setState({
              images: [...prevState.images, ...data.hits],
            });

        // Повернення пустого масиву з бекенду
        if (data.hits.length === 0) {
          this.setState({
            status: Status.Q_ERROR,
          });
        }
      } catch (error) {
        this.setState({
          status: Status.T_ERROR,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { status, images, isLoading, isMore, totalImg } = this.state;
    const { handleCilck, page } = this.props;

    console.log(this.state.status);

    return (
      <>
        {isLoading && <Loader visible={isLoading} />}

        {status === 'success' && (
          <>
            {page === 1 && <SuccessMessage totalImg={totalImg} />}
            <Gallery>
              {images.map(image => {
                return <ImageGalleryItem key={image.id} image={image} />;
              })}
            </Gallery>
          </>
        )}

        {isMore && <Button onClick={handleCilck} />}

        {status === 'technical error' && <TechError />}

        {status === 'query error' && <QueryError />}

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
