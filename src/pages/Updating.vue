<template>
  <GameOverlay center-content show-logo data-test="game-updating">
    <template #title> Updating</template>
    <template #msg> <p>Updating app...</p></template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'UpdatingPage',
  components: {
    GameOverlay,
  },
  mounted() {
    this.updateApp();

    setTimeout(this.loadHome, 2000);
  },
  methods: {
    ...mapActions(['updateApp']),
    loadHome() {
      this.$router.replace('/');
    },
  },
};
</script>
