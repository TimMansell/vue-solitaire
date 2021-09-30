<template>
  <div>
    <Header />
    <Solitaire />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Solitaire from '@/components/Solitaire.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Solitaire,
    Footer,
  },
};
</script>
