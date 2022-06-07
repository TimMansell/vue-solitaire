<template>
  <div class="controls">
    <div class="controls__actions">
      <NewGameButton />
      <PauseGameButton />
      <HistoryButton />
      <ViewStatsButton />
      <LeaderboardsButton />
    </div>
    <div>
      <ShowRulesButton />
      <PortfolioButton />
      <GithubButton v-if="showGithubButton" />
    </div>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
import { matchesMedia } from '@/helpers/matchMedia';
import NewGameButton from './NewGameButton.vue';
import PauseGameButton from './PauseGameButton.vue';
import ShowRulesButton from './ShowRulesButton.vue';
import HistoryButton from './HistoryButton.vue';
import ViewStatsButton from './ViewStatsButton.vue';
import LeaderboardsButton from './LeaderboardsButton.vue';
import GithubButton from './GithubButton.vue';
import PortfolioButton from './PortfolioButton.vue';

export default {
  name: 'Controls',
  components: {
    NewGameButton,
    PauseGameButton,
    ShowRulesButton,
    HistoryButton,
    ViewStatsButton,
    LeaderboardsButton,
    GithubButton,
    PortfolioButton,
  },
  data() {
    return {
      showGithubButton: false,
    };
  },
  mounted() {
    const events = {
      resize: debounce(300, false, this.setGithubButton),
    };

    this.events = addEventListener(events);

    this.setGithubButton();
  },
  unmounted() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    setGithubButton() {
      const showButton = matchesMedia('xs');

      this.showGithubButton = showButton;
    },
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--pd-sm);
  width: 100%;

  @media (min-width: $bp-sm) {
    width: auto;
    padding-bottom: 0;
  }

  &__actions {
    display: flex;
    flex: 1;
    margin-right: var(--mg-xs);

    @media (min-width: $bp-sm) {
      margin-right: var(--mg-sm);
    }
  }
}
</style>
