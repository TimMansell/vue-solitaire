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
  margin-top: $mg-sm;
  padding-bottom: $pd-sm;
  border-bottom: 1px solid rgba($bdr-secondary, 0.2);
  box-shadow: 0 1px rgba($col-secondary, 0.05);

  @media (min-width: $bp-sm) {
    position: fixed;
    right: $vr / 2;
    top: $vr / 2;
    margin-top: auto;
    border-bottom: 0;
    box-shadow: none;
  }
}
</style>
