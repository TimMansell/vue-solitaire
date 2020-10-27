<template>
  <Button @click="showRules" data-test="game-rules">
    How to play
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ShowRules',
  components: {
    Button,
  },
  methods: {
    showRules() {
      this.$modal.show('modal');

      this.$gtag.event('Show Rules', { event_category: 'Buttons' });
    },
  },
};
</script>
