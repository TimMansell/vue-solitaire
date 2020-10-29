<template>
  <GameOverlay alt data-test="user-stats">
    <template #title> Stats </template>
    <template #msg>
      <div>Played: {{ fullUserStats.count }}</div>
      <div>Won: {{ fullUserStats.won }}</div>
      <div>Lost: {{ fullUserStats.lost }}</div>
      <div>Abandoned: {{ abandoned }}</div>
    </template>
    <template #buttons> <Button @click="toggleStats">Close</Button> </template>
  </GameOverlay>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    Button,
  },
  computed: {
    ...mapGetters(['fullUserStats']),
    abandoned() {
      const { count, completed } = this;
      const abandoned = completed - count;

      return abandoned;
    },
  },
  mounted() {
    this.getUserStats();
  },
  methods: {
    ...mapActions(['getUserStats', 'toggleStats']),
  },
};
</script>
