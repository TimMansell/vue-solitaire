<template>
  <div>
    Games: <Counter data-test="stats" :number="number" /> (<ViewStatsButton
      :load-stats="getUserStats"
    />)
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';
import Counter from '@/components/Counter.vue';

export default {
  name: 'Stats',
  components: {
    ViewStatsButton,
    Counter,
  },
  computed: {
    ...mapGetters(['userStats']),
    number() {
      const {
        userStats: { gameNumber },
      } = this;

      return gameNumber;
    },
  },
  methods: {
    ...mapActions(['getUserStats']),
  },
};
</script>
