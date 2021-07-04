<template>
  <div class="logo">
    <img class="logo__image" :src="logo" />
  </div>
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: 'Logo',
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: var(--mg-md);

  &__image {
    width: 150px;
    height: auto;

    @media (min-width: $bp-sm) {
      width: 175px;
    }
  }
}
</style>
