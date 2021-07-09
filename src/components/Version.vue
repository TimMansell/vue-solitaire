<template>
  <div class="version">
    <a
      href="https://github.com/TimMansell/vue-solitaire"
      target="_blank"
      rel="noopener noreferrer"
      title="View Source Code"
    >
      <span class="version__v">v</span>{{ version }}
    </a>
  </div>
</template>

<script>
import { version } from '../../package.json';

export default {
  name: 'Version',
  data() {
    return {
      version,
    };
  },
};
</script>

<style scoped lang="scss">
.version {
  font-size: var(--font-size-xs);

  @media (min-width: $bp-sm) {
    font-size: var(--font-size-sm);
  }

  &__v {
    font-size: var(--font-size-xs);
  }
}
</style>
