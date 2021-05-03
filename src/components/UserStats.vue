<template>
  <div>
    Games:
    <Counter data-test="stats" :number="number" />
    <span v-if="isStatsEnabled">
      (<ViewStatsButton
        :load-stats="getUserStats"
        data-test="user-stats-btn"
      />)</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';
import Counter from '@/components/Counter.vue';
import { checkStatsFlag } from '@/helpers/stats';

export default {
  name: 'Stats',
  components: {
    ViewStatsButton,
    Counter,
  },
  data() {
    return {
      isStatsEnabled: checkStatsFlag(),
    };
  },
  computed: {
    ...mapGetters(['userStats']),
    number() {
      const {
        userStats: { completed },
      } = this;

      return completed;
    },
  },
  methods: {
    ...mapActions(['getUserStats']),
  },
};
</script>
