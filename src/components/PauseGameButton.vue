<template>
  <Button
    :is-stacked="isStacked"
    @click="toggleGamePaused"
    :disabled="isGameLoading"
    data-test="pause-game-btn"
  >
    <span v-if="!isGamePaused">Pause</span>
    <span v-if="isGamePaused">Resume</span>
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isGamePaused', 'isGameLoading']),
  },
  methods: {
    ...mapActions(['toggleGamePaused']),
  },
};
</script>
