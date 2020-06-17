<template>
  <div class="footer">
    <a class="footer__link" href="https://github.com/TimMansell/vue-solitaire">
      View source code
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
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: #fff;

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
