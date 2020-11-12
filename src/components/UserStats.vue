<template>
  <div>
    Games:
    <span data-test="stats"> <Counter data-test="stats" :number="number"/></span> (<ViewStatsButton
      :load-stats="getUserStats"
      data-test="user-stats-btn"
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
