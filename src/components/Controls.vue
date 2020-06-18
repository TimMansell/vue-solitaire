<template>
  <div class="controls">
    <NewGame />
    <ShowRules />
  </div>
</template>

<script>
import NewGame from './NewGame.vue';
import ShowRules from './ShowRules.vue';

export default {
  name: 'Controls',
  components: {
    NewGame,
    ShowRules,
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
    text-align: right;
  }
}
</style>
