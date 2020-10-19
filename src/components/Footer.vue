<template>
  <footer class="footer">
    <GlobalStats class="footer__stats" />
    <div class="footer__links">
      <a class="footer__link" href="https://timmansell.com">
        timmansell.com
      </a>
      <a class="footer__link" href="https://github.com/TimMansell/vue-solitaire">
        GitHub
      </a>
      <span>v{{ version }}</span>
    </div>
  </footer>
</template>

<script>
import GlobalStats from '@/components/GlobalStats.vue';
import { version } from '../../package.json';

export default {
  name: 'Footer',
  components: {
    GlobalStats,
  },
  data() {
    return {
      version,
    };
  },
};
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-left: var(--pd-sm);
  padding-right: var(--pd-sm);
  font-size: var(--font-size-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-top: 1px solid rgba($col-secondary, 0.05);
  box-shadow: 0 -1px rgba($col-tertiary, 0.2);

  @media (min-width: $bp-sm) {
    flex-direction: row;
  }

  @media (min-width: $bp-md) {
    justify-content: right;
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
    text-shadow: -1px -1px var(--col-primary-dark);
  }

  &__stats {
    align-self: center;

    @media (min-width: $bp-sm) {
      align-self: inherit;
    }
  }

  &__links {
    display: flex;
    flex: 1;
    align-self: center;

    @media (min-width: $bp-sm) {
      justify-content: flex-end;
      align-self: inherit;
    }
  }

  &__link {
    color: var(--text-primary);

    &:hover {
      text-decoration: none;
    }

    &::after {
      content: '|';
      margin-left: var(--mg-sm);
      margin-right: var(--mg-sm);
    }
  }
}
</style>
