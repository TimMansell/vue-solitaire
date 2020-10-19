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
  display: flex;
  justify-content: center;
  padding-bottom: var(--pd-sm);
  border-bottom: 1px solid rgba($col-tertiary, 0.2);
  box-shadow: 0 1px rgba($col-secondary, 0.05);
  width: 100%;

  @media (min-width: $bp-sm) {
    width: auto;
    border-bottom: 0;
    box-shadow: none;
    padding-bottom: 0;
  }
}
</style>
