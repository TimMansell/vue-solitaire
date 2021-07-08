<template>
  <div class="footer-links">
    <a
      class="footer-links__link"
      href="https://timmansell.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      timmansell.com
    </a>
    <a
      class="footer-links__link"
      href="https://github.com/TimMansell/vue-solitaire"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>
    <Version />
  </div>
</template>

<script>
import Version from '@/components/Version.vue';

export default {
  name: 'FooterLinks',
  components: {
    Version,
  },
};
</script>

<style scoped lang="scss">
.footer-links {
  display: none;

  @media (min-width: $bp-sm) {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  &__link {
    color: var(--text-primary);

    &:hover {
      text-shadow: none;
    }

    &::after {
      content: '/';
      margin-left: var(--mg-sm);
      margin-right: var(--mg-sm);
    }
  }
}
</style>
