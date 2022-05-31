import { createApp } from 'vue';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import { store } from '@/store';
import router from '@/router';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');

// Give access to cypress.
if (import.meta.env.DEV) {
  window.solitaire = app;
}
