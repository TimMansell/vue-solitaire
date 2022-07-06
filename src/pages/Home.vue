<template>
  <div data-test="home">
    <Header />
    <Solitaire />
    <Footer />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import Header from '@/components/Header.vue';
import Solitaire from '@/components/Solitaire.vue';

const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));

export default {
  name: 'HomePage',
  components: {
    Header,
    Solitaire,
    Footer,
  },
};
</script>
