<template>
  <div class="winner">
    <h1 class="winner__title">Congratulations, you win!</h1>
    <div class="winner__btn" @click="setGameWon(false)">
      <NewGame />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NewGame from '@/components/NewGame.vue';

export default {
  name: 'Winner',
  components: {
    NewGame,
  },
  methods: {
    ...mapActions(['setGameWon']),
  },
};
</script>

<style lang="scss" scoped>
.winner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);

  &__title {
    color: white;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.3);
  }
}
</style>
