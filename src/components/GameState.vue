<template>
  <div>
    <GameWon v-if="isGameWon && !hasMoves" />
    <GameLost v-if="isGameLost && !hasMoves" />
    <GamePaused />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['isGameWon', 'isGameLost', 'hasMoves']),
  },
};
</script>
