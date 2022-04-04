import { createToastInterface } from 'vue-toastification';
import Toast from '@/components/Toast.vue';

const toast = createToastInterface({
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  hideProgressBar: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  icon: false,
});

const createComponent = (props) => ({
  component: Toast,
  props,
});

export const createToast = ({
  id,
  content,
  timeout = false,
  icon,
  position = 'bottom-center',
}) =>
  toast(
    { ...createComponent({ id, content, icon }) },
    {
      id,
      timeout,
      position,
    }
  );

export const updateToast = ({ id, content, timeout = false, icon }) =>
  toast.update(
    id,
    {
      content: {
        ...createComponent({ id, content, icon }),
      },
      options: { timeout },
    },
    true
  );

export const dismissToast = ({ id }) => toast.dismiss(id);
