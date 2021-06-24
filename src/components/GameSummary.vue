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
        <p class="game-summary__description">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { faUserClock, faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'GameSummary',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      summary: [
        { icon: faUserClock, name: 'Time', value: '03:05:52' },
        { icon: faDice, name: 'Moves', value: 45 },
      ],
    };
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
    font-size: 1.25rem;
    line-height: 0.8;
    margin-bottom: var(--vr-xxs);
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
  }

  &__description {
    font-size: 1rem;
    margin: 0;
    line-height: 1.2;
  }
}
</style>
