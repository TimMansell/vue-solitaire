<template>
  <Button
    @click="viewStats"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="stats-btn"
  >
    Stats
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ViewStatsButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    viewStats() {
      this.setGamePaused(true);

      this.$router.push('/stats');
    },
  },
};
</script>
