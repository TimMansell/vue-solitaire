<template>
  <Button
    :is-stacked="true"
    @click="toggleStats"
    :disabled="isGameLoading"
    data-test="stats-btn"
  >
    Stats
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ViewStatsButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['toggleStats']),
  },
};
</script>
