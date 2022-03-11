import { createToastInterface } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toast = createToastInterface({
  position: 'bottom-center',
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
});

export const createToast = ({ id, content, timeout = 2000 }) =>
  toast.success(content, {
    id,
    timeout,
    bodyClassName: [`${id}-toast`],
  });

export const updateToast = ({ id, content }) =>
  toast.update(id, { content }, true);
