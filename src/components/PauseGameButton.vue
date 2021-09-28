<template>
  <RouterLink to="/pause">
    <Button
      :is-stacked="true"
      :disabled="isGameLoading"
      data-test="pause-game-btn"
    >
      Pause
    </Button>
  </RouterLink>
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
