<template>
  <GameOverlay center-content show-logo data-test="game-lost">
    <template #title>
      Sorry, no more Moves!
    </template>
    <template #msg>
      <Table
        :headings="['Game', 'Duration', 'Moves']"
        :items="[['3,806', '03:05:52', '12']]"
      />
    </template>
    <template #buttons>
      <NewGameButton is-completed />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import Table from '@/components/Table.vue';
import NewGameButton from './NewGameButton.vue';

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    NewGameButton,
    Table,
  },
};
</script>
