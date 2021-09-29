<template>
  <Button
    @click="newGame"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="new-game-btn"
  >
    New
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    newGame() {
      this.setGamePaused(true);

      this.$router.push('/new');
    },
  },
};
</script>
