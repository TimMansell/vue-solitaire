<template>
  <RouterLink to="/">
    <Button data-test="resume-game-btn"> Resume </Button>
  </RouterLink>
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
