<template>
  <RouterLink to="/">
    <Button data-test="continue-game-btn"> Continue </Button>
  </RouterLink>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
};
</script>
