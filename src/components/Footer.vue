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
  font-size: $font-size;
  background: $bg-primary;
  color: $text-primary;
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  box-shadow: 0 -1px rgba($bdr-secondary, 0.2);

  @media (min-width: $bp-md) {
    justify-content: right;
    right: $vr / 2;
    bottom: $vr / 4;
    width: auto;
    background: transparent;
    text-shadow: 1px 1px 1px #000;
    border-top: 0;
    box-shadow: none;
  }

  &__link {
    color: $text-primary;

    &:hover {
      text-decoration: none;
    }

    &::after {
      content: '|';
      margin-left: $mg-sm;
      margin-right: $mg-sm;
    }
  }
}
</style>
