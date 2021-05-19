<template>
  <GameOverlay id="history-overlay" alt center-content data-test="game-history">
    <template #title>
      History
    </template>
    <template #msg>
      <GameHistory />
    </template>
    <template #buttons>
      <Button @click="toggleHistory" data-test="close-history-btn">
        Close
      </Button>
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GameHistory from '@/components/GameHistory.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    GameHistory,
    Button,
  },
  methods: {
    ...mapActions(['toggleHistory']),
  },
};
</script>
