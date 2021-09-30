<template>
  <Button
    link="/new"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="new-game-btn"
  >
    New
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
};
</script>
