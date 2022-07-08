<template>
  <GameOverlay
    center-content
    show-logo
    :is-visible="isVisible"
    data-test="lost"
  >
    <template #title> Sorry, no more Moves!</template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <StartNewGameButton />
      <ShowHideBoardButton :is-show="isVisible" />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import StartNewGameButton from '@/components/StartNewGameButton.vue';
import ShowHideBoardButton from '@/components/ShowHideBoardButton.vue';

export default {
  name: 'LostPage',
  components: {
    GameOverlay,
    StartNewGameButton,
    GameSummary,
    ShowHideBoardButton,
  },
  props: {
    show: {
      type: String,
      default: '',
    },
  },
  computed: {
    isVisible() {
      const { show } = this;

      return !show.includes('hide');
    },
  },
};
</script>
