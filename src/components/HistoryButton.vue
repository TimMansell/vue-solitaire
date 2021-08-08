<template>
  <Button
    :is-stacked="isStacked"
    @click="toggleHistory"
    data-test="history-btn"
  >
    Games
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'HistoryButton',
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
    ...mapActions(['toggleHistory']),
  },
};
</script>
