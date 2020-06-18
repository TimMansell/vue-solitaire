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
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  box-shadow: 0 -1px rgba(0, 0, 0, 0.2);

  @media (min-width: $bp-md) {
    justify-content: right;
    right: 0.5rem;
    bottom: 0.25rem;
    background: transparent;
    text-shadow: 1px 1px 1px #000;
    border-top: 0;
    box-shadow: none;
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
