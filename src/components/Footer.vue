<template>
  <div class="footer">
    <a class="footer__link" href="https://timmansell.com">
      timmansell.com
    </a>
    <a class="footer__link" href="https://github.com/TimMansell/vue-solitaire">
      GitHub
    </a>
    <div>v{{ version }}</div>
  </div>
</template>

<script>
import { version } from '../../package.json';

export default {
  name: 'Footer',
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
  font-size: 0.8rem;
  background: #027002;
  color: #fff;

  @media (min-width: $bp-sm) {
    justify-content: right;
    right: 0.5rem;
    background: transparent;
    text-shadow: 1px 1px 1px #000;
  }

  &__link {
    color: #fff;

    &:hover {
      text-decoration: none;
    }

    &::after {
      content: '|';
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
