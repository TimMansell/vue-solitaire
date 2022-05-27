<template>
  <Button
    :is-stacked="true"
    :check-disabled="true"
    to-page="history"
    data-test="history-btn"
  >
    Games
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'HistoryButton',
  components: {
    Button,
  },
};
</script>
