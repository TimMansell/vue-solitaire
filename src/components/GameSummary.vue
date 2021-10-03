<template>
  <div class="game-summary">
    <div
      class="game-summary__item"
      v-for="({ icon, name, value }, index) in summary"
      :key="index"
    >
      <div class="game-summary__icon">
        <FontAwesomeIcon :icon="icon" size="2x" />
      </div>
      <div class="game-summary__content">
        <h2 class="game-summary__title">
          {{ name }}
        </h2>
        <p class="game-summary__description" data-test="game-summary-value">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { faUserClock, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';
import numeral from 'numeral';

export default {
  name: 'GameSummary',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['duration', 'moves']),
    summary() {
      const { duration, moves } = this;

      const summary = [
        {
          icon: faUserClock,
          name: 'Time',
          value: numeral(duration).format('00:00:00'),
        },
        { icon: faHistory, name: 'Moves', value: moves },
      ];

      return summary;
    },
  },
};
</script>

<style scoped lang="scss">
.game-summary {
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: left;
  border: 1px solid var(--bdr-secondary);
  border-radius: var(--bdr-radius-lg);
  padding: var(--pd-md);
  margin-bottom: var(--mg-md);

  &__item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-self: center;
    margin-right: var(--mg-sm);
    margin-left: var(--mg-sm);

    @media (min-width: $bp-sm) {
      margin-right: var(--mg-md);
      margin-left: var(--mg-md);
    }
  }

  &__title {
    font-size: var(--font-size-md);
    line-height: 0.8;
    font-weight: var(--font-weight-normal);
    margin-bottom: var(--mg-xxs);
  }

  &__content {
    width: 100%;
    margin-left: var(--mg-sm);

    @media (min-width: $bp-sm) {
      margin-left: var(--mg-md);
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    color: var(--col-secondary);
  }

  &__description {
    font-size: calc(var(--font-size) * 1.1);
    margin: 0;
    line-height: 1.2;
  }
}
</style>
