<template>
  <RouterLink to="/games">
    <Button
      :is-stacked="true"
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
  computed: {
    ...mapGetters(['isGameLoading']),
  },
};
</script>
