<template>
  <Button :is-stacked="true" @click="toggleStats" data-test="stats-btn">
    Stats
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ViewStatsButton',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['toggleStats']),
  },
};
</script>
