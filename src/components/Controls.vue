<template>
  <div class="controls">
    <NewGameButton show-confirmation is-stacked />
    <PauseGameButton is-stacked />
    <HistoryButton is-stacked />
    <ViewStatsButton is-stacked />
    <ShowRulesButton is-stacked />
  </div>
</template>

<script>
import NewGameButton from './NewGameButton.vue';
import PauseGameButton from './PauseGameButton.vue';
import ShowRulesButton from './ShowRulesButton.vue';
import HistoryButton from './HistoryButton.vue';
import ViewStatsButton from './ViewStatsButton.vue';

export default {
  name: 'Controls',
  components: {
    NewGameButton,
    PauseGameButton,
    ShowRulesButton,
    HistoryButton,
    ViewStatsButton,
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: center;
  padding-bottom: var(--pd-sm);
  width: 100%;

  @media (min-width: $bp-sm) {
    width: auto;
    border-bottom: 0;
    box-shadow: none;
    padding-bottom: 0;
  }
}
</style>
