<template>
  <footer class="footer">
    <GlobalGames />
    <FooterLinks />
    <Players />
  </footer>
</template>

<script>
import GlobalGames from '@/components/GlobalGames.vue';
import FooterLinks from '@/components/FooterLinks.vue';
import Players from '@/components/Players.vue';

export default {
  name: 'Footer',
  components: {
    GlobalGames,
    FooterLinks,
    Players,
  },
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
