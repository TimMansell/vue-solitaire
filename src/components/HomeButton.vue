<template>
  <Button @click="goHome" data-test="home-btn"> Go Home </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'HomeButton',
  components: {
    Button,
  },

  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
