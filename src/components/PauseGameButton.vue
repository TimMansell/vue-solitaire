<template>
  <Button
    :is-stacked="true"
    :check-disabled="true"
    route="pause"
    data-test="pause-game-btn"
  >
    Pause
  </Button>
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
