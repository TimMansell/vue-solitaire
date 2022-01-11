<template>
  <GameOverlay center-content show-logo data-test="game-update">
    <template #title>
      <span v-if="!isLatest">New Update</span>
      <span v-if="isLatest">No Updates Available</span>
    </template>
    <template #msg>
      <p v-if="!isLatest">A new version of the game is available</p>
      <p v-if="isLatest">You are on the latest version</p>
    </template>
    <template #buttons>
      <UpdateButton v-if="!isLatest" />
      <ContinueGameButton v-if="isLatest" />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import UpdateButton from '@/components/UpdateButton.vue';
import ContinueGameButton from '@/components/ContinueGameButton.vue';

export default {
  name: 'UpdatePage',
  components: {
    GameOverlay,
    UpdateButton,
    ContinueGameButton,
  },
  computed: {
    ...mapGetters(['isLatest']),
  },
  beforeRouteLeave(to, from, next) {
    const { isLatest } = this;

    if (!isLatest) {
      next(false);
    } else {
      next();
    }
  },
};
</script>
