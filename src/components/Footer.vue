<template>
  <footer class="footer">
    <GlobalStats />
    <FooterLinks />
  </footer>
</template>

<script>
import GlobalStats from '@/components/GlobalStats.vue';
import FooterLinks from '@/components/FooterLinks.vue';

export default {
  name: 'Footer',
  components: {
    GlobalStats,
    FooterLinks,
  },
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  width: 100%;
  bottom: 0;
  padding: var(--pd-sm);
  font-size: var(--font-size-sm);
  line-height: 1;
  color: var(--text-primary);
  text-shadow: 0 1px var(--col-primary-dark-2);
  background: var(--bg-primary);

  @media (min-width: $bp-sm) {
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid rgba($col-secondary, 0.05);
    box-shadow: 0 -1px var(--bdr-secondary);
  }

  @media (min-width: $bp-md) {
    font-size: var(--font-size);
  }
}
</style>
