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
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-left: calc(var(--vr) / 2);
  padding-right: calc(var(--vr) / 2);
  font-size: var(--font-size);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-top: 1px solid rgba($col-secondary, 0.05);
  box-shadow: 0 -1px rgba($col-tertiary, 0.2);

  @media (min-width: $bp-md) {
    justify-content: right;
    bottom: calc(var(--vr) / 4);
    background: transparent;
    text-shadow: 1px 1px 1px #000;
    border-top: 0;
    box-shadow: none;
  }

  &__links {
    display: flex;
    justify-content: flex-end;
    flex: 1;
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
