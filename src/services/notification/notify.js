import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './notification.scss';

// eslint-disable-next-line import/prefer-default-export
export const notify = ({ type, title = '', msg = '', btn = '' }) => {
  const notyf = new Notyf({
    position: { x: 'right', y: 'top' },
    duration: 0,
    icon: false,
    className: 'test',
    types: [
      {
        type: 'warning',
        background: '#fff',
      },
    ],
  });

  const message = `<div class="notyf__content-container">
    <div class="notyf__content">
      <h2 class="notyf__header">${title}</h2>
      <p class="notyf__msg">${msg}</p>
    </div>
    <button class="notyf__btn">${btn}</button>
  </div>`;

  const notification = notyf.open({
    type,
    message,
  });

  notification.on('click', () => {
    window.location.href = '/';
  });
};
