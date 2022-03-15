import { createToastInterface } from 'vue-toastification';
import Toast from '@/components/Toast.vue';

const toast = createToastInterface({
  position: 'bottom-center',
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  hideProgressBar: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  icon: false,
});

const createComponent = ({ content, icon }) => ({
  component: Toast,
  props: {
    content,
    icon,
  },
});

export const createToast = ({ id, content, timeout = false, icon }) =>
  toast(
    { ...createComponent({ content, icon }) },
    {
      id,
      timeout,
    }
  );

export const updateToast = ({ id, content, timeout = false, icon }) =>
  toast.update(
    id,
    {
      content: {
        ...createComponent({ content, icon }),
      },
      options: { timeout },
    },
    true
  );

export const dismissToast = ({ id }) => toast.dismiss(id);
