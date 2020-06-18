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
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px hsla(0, 0%, 100%, 0.05);

  @media (min-width: $bp-sm) {
    position: fixed;
    right: 0.5rem;
    top: 0.5rem;
    margin-top: auto;
    border-bottom: 0;
    box-shadow: none;
  }
}
</style>
