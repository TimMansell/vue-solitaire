<template>
  <Button
    @click="$router.push('/history')"
    :is-stacked="true"
    :check-disabled="true"
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
