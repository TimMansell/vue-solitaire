<template>
  <GameOverlay center-content show-logo data-test="update">
    <template #title>
      <span v-if="isOldVersion" data-test="update-title">New Update</span>
      <span v-if="!isOldVersion" data-test="update-title">No New Updates</span>
    </template>
    <template #msg>
      <p v-if="isOldVersion">A new version of the game is available</p>
      <p v-if="!isOldVersion">You are on the latest version</p>
    </template>
    <template #buttons>
      <UpdateButton v-if="isOldVersion" />
      <ContinueGameButton v-if="!isOldVersion" />
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
    ...mapGetters(['isOldVersion']),
  },
  beforeRouteLeave(to, from, next) {
    const { isOldVersion } = this;

    if (isOldVersion) {
      next(false);
    } else {
      next();
    }
  },
};
</script>
