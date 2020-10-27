<template>
  <div>
    <GameWon />
    <GameLost />
    <GamePaused />
  </div>
</template>

<script>
import GameWon from '@/components/GameWon.vue';
import GameLost from '@/components/GameLost.vue';
import GamePaused from '@/components/GamePaused.vue';

export default {
  name: 'GameState',
  components: {
    GameWon,
    GameLost,
    GamePaused,
  },
};
</script>
