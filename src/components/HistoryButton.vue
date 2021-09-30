<template>
  <Button
    @click="$router.push('/games')"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="history-btn"
  >
    Games
  </Button>
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
