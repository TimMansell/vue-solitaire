<template>
  <RouterLink to="/new">
    <Button
      :is-stacked="true"
      :disabled="isGameLoading"
      data-test="new-game-btn"
    >
      New
    </Button>
  </RouterLink>
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
