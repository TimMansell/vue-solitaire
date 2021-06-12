<template>
  <Button :is-stacked="isStacked" @click="showRules" data-test="game-rules-btn">
    Rules
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
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(['toggleRules']),
    showRules() {
      this.toggleRules();
    },
  },
};
</script>
