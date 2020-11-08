<template>
  <Button link @click="viewStats" data-test="view-stats-btn"> view stats </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['toggleStats', 'setGamePaused']),
    viewStats() {
      const isPaused = {
        isPaused: true,
        isActive: false,
        showMsg: false,
      };

      this.setGamePaused(isPaused);
      this.toggleStats();
    },
  },
};
</script>
