<template>
  <Button
    @click="viewGames"
    :is-stacked="isStacked"
    :disabled="isGameLoading"
    data-test="history-btn"
  >
    Games
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  methods: {
    ...mapActions(['setGamePaused']),
    viewGames() {
      this.setGamePaused(true);

      this.$router.push('/games');
    },
  },
};
</script>
