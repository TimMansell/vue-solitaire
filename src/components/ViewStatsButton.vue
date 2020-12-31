<template>
  <Button link @click="viewStats">
    view stats
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  props: {
    loadStats: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    ...mapActions(['toggleStats']),
    viewStats() {
      this.loadStats();
      this.toggleStats();
    },
  },
};
</script>
