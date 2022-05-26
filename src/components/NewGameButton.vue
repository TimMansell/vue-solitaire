<template>
  <Button
    @click="$router.replace('/new')"
    :is-stacked="true"
    :check-disabled="true"
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
