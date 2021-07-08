<template>
  <div class="version"><span class="version__v">v</span>{{ version }}</div>
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

  @media (min-width: $bp-md) {
    font-size: var(--font-size);
  }

  &__v {
    font-size: var(--font-size-xs);
  }
}
</style>
