<template>
  <Button route="home" data-test="continue-game-btn"> Continue </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ContinueGameButton',
  components: {
    Button,
  },
};
</script>
