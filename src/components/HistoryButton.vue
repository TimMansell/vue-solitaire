<template>
  <RouterLink to="/games">
    <Button
      :is-stacked="isStacked"
      :disabled="isGameLoading"
      data-test="history-btn"
    >
      Games
    </Button>
  </RouterLink>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['isGameLoading']),
  },
};
</script>
