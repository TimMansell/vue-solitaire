<template>
  <Button
    @click="$router.push('/new')"
    :is-stacked="true"
    :disabled="!hasCards || !isOnline || isGamePaused"
    data-test="new-game-btn"
  >
    New
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGameButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['hasCards', 'isOnline', 'isGamePaused']),
  },
};
</script>
