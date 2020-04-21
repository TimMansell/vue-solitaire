<template>
  <div class="controls">
    <NewGame />
    <Rules />
  </div>
</template>

<script>
import NewGame from '@/components/NewGame.vue';
import Rules from '@/components/Rules.vue';

export default {
  name: 'Controls',
  components: {
    NewGame,
    Rules,
  },
};
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  left: 0.5rem;
  bottom: 0.5rem;
  display: flex;

  @media (min-width: $bp-sm) {
    display: block;
    left: auto;
    right: 0.5rem;
    top: 0.5rem;
  }
}
</style>
