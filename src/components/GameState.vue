<template>
  <div>
    <GameWon v-if="isGameWon && !hasMoves" />
    <GameLost v-if="isGameLost && !hasMoves" />
    <GamePaused v-if="isGamePaused" />
  </div>
</template>

<script>
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
import { mapGetters, mapActions } from 'vuex';
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
    ...mapGetters([
      'isGameWon',
      'isGameLost',
      'hasMoves',
      'isGamePaused',
      'isTimerPaused',
    ]),
  },
  mounted() {
    const events = {
      visibilitychange: (e) => setTimeout(this.checkGamePaused, 2000, e),
    };

    this.events = addEventListener(events);
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    ...mapActions(['setGameInactive']),
    checkGamePaused(e) {
      const { isGamePaused, isTimerPaused } = this;
      const { visibilityState } = e.target;

      if (isGamePaused || isTimerPaused) return;

      if (visibilityState === 'hidden') {
        this.setGameInactive();
      }
    },
  },
};
</script>
