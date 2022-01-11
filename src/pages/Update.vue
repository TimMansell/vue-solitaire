<template>
  <GameOverlay center-content show-logo data-test="game-update">
    <template #title>
      <span v-if="!isLatestVersion">New Update</span>
      <span v-if="isLatestVersion">No Updates Available</span>
    </template>
    <template #msg>
      <p v-if="!isLatestVersion">A new version of the game is available</p>
      <p v-if="isLatestVersion">You are on the latest version</p>
    </template>
    <template #buttons>
      <UpdateButton v-if="!isLatestVersion" />
      <ContinueGameButton v-if="isLatestVersion" />
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
    ...mapGetters(['isLatestVersion']),
  },
  beforeRouteLeave(to, from, next) {
    const { isLatestVersion } = this;

    if (!isLatestVersion) {
      next(false);
    } else {
      next();
    }
  },
};
</script>
