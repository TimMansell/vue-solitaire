<template>
  <div>
    Games:
    <Counter data-test="global-stats" :number="globalGameCount" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  name: 'GlobalGames',
  components: {
    Counter,
  },
  computed: {
    ...mapGetters(['globalGameCount']),
  },
};
</script>
