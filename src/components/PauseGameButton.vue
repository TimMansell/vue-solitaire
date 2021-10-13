<template>
  <Button
    @click="$router.push('/pause')"
    :is-stacked="true"
    :disabled="!hasCards || !isOnline"
    data-test="pause-game-btn"
  >
    Pause
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['hasCards', 'isOnline']),
  },
};
</script>
