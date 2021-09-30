<template>
  <RouterLink to="/">
    <Button data-test="home-btn"> Go Home </Button>
  </RouterLink>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'HomeButton',
  components: {
    Button,
  },
};
</script>
