<template>
  <Button
    :is-stacked="true"
    :check-disabled="true"
    to-page="new"
    data-test="new-game-btn"
  >
    New
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'NewGameButton',
  components: {
    Button,
  },
};
</script>
