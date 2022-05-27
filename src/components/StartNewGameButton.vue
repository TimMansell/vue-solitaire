<template>
  <Button @click="newGame" to-page="home" data-test="start-new-game-btn">
    New
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'StartNewGameButton',
  components: {
    Button,
  },

  methods: {
    ...mapActions(['newGame']),
  },
};
</script>
