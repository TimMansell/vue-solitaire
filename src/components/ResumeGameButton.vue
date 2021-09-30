<template>
  <Button link="/" data-test="resume-game-btn"> Resume </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
};
</script>
