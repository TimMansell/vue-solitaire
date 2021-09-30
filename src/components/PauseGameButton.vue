<template>
  <Button
    link="/pause"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="pause-game-btn"
  >
    Pause
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
};
</script>
