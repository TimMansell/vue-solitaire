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
  margin-bottom: var(--vr);

  &__image {
    width: 100px;
    height: 103px;

    @media (min-width: $bp-sm) {
      width: 175px;
      height: 180px;
    }
  }
}
</style>
