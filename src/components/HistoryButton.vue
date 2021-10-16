<template>
  <Button
    @click="$router.push('/history')"
    :is-stacked="true"
    :disabled="emptyBoard || !isOnline"
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
    ...mapGetters(['emptyBoard', 'isOnline']),
  },
};
</script>
