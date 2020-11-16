<template>
  <Button @click="showRules" data-test="game-rules-btn">
    How to play
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ShowRules',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['toggleRules', 'setGamePaused']),
    showRules() {
      this.setGamePaused();
      this.toggleRules();
    },
  },
};
</script>
