import { toast } from 'react-toastify';

export const SuccessMessage = ({ totalImg }) => {
  const customId = '1';

  toast.success(`We found ${totalImg} images`, { toastId: customId });
};

export const TechError = () => {
  const customId = '2';
  toast.error('Sorry, something went wrong. Please, try again', {
    toastId: customId,
  });
};

export const QueryError = () => {
  const customId = '3';
  toast.error('No results were found for your request', { toastId: customId });
};
