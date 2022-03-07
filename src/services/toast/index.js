import { createToastInterface } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// eslint-disable-next-line import/prefer-default-export
export const toast = createToastInterface({
  position: 'bottom-center',
  closeButton: false,
  timeout: 2000,
  draggable: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
});
