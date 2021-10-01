<template>
  <GameOverlay show-close data-test="rules-overlay">
    <template #title> How to play </template>
    <template #msg>
      <Rules />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import Rules from '@/components/Rules.vue';

export default {
  name: 'RulesPage',
  components: {
    GameOverlay,
    Rules,
  },
};
</script>
