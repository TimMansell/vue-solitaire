<template>
  <div class="footer-links">
    <a
      class="footer-links__link"
      href="https://timmansell.com"
      target="_blank"
      rel="noopener noreferrer"
      title="View My Portfolio"
    >
      timmansell.com
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
  display: flex;

  &__link {
    display: none;
    color: var(--text-primary);

    @media (min-width: $bp-sm) {
      display: block;
    }

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
