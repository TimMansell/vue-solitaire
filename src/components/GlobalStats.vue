<template>
  <div>
    Global Games: <Counter data-test="global-stats" :number="number" />(<ViewStatsButton
      :load-stats="getGlobalStats"
    />)
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Counter from '@/components/Counter.vue';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'GlobalStats',
  components: {
    Counter,
    ViewStatsButton,
  },
  computed: {
    ...mapGetters(['globalStats']),
    number() {
      const {
        globalStats: { count },
      } = this;

      return count;
    },
  },
  methods: {
    ...mapActions(['getGlobalStats']),
  },
};
</script>
