import { createToastInterface } from 'vue-toastification';
import Toast from '@/components/Toast.vue';

const toast = createToastInterface();

const createComponent = (props) => ({
  component: Toast,
  props,
});

const config = {
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  hideProgressBar: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  icon: false,
};

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
      ...config,
      id,
      timeout,
      position,
    }
  );

export const updateToast = ({
  id,
  content,
  timeout = false,
  icon,
  position = 'bottom-center',
}) =>
  toast.update(
    id,
    {
      content: {
        ...createComponent({ id, content, icon }),
      },
      options: { ...config, timeout, position },
    },
    true
  );

export const dismissToast = ({ id }) => toast.dismiss(id);
