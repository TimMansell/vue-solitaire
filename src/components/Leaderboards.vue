<template>
  <div class="leaderboards" data-test="leaderboards">
    <p data-test="game-history-showing-games">Your username is: {{ luid }}</p>

    <div
      ref="scrollTo"
      class="leaderboards__controls"
      data-test="leaderboards-controls"
    >
      <Select
        v-model="showBest"
        label="Show Best"
        :items="['Moves', 'Times']"
        @select="setBest"
      />

      <Select
        v-model="limit"
        label="Show Top"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <h2>Top {{ limit }} Best {{ showBest }}</h2>

    <ResponsiveTable
      :headings="['Rank', 'Date', 'User', `${showBest}`]"
      :items="games"
      :placeholder-rows="limit"
      :to-highlight="{ key: 'uid', value: luid }"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';
import { formatDate } from '@/helpers/dates';

export default {
  name: 'Leaderboards',
  components: {
    Select,
    ResponsiveTable,
  },
  data() {
    return {
      limit: 25,
      games: [],
      showBest: 'Moves',
    };
  },
  watch: {
    limit() {
      this.displayGames({ autoScroll: true });
    },
    showBest() {
      this.displayGames({ autoScroll: true });
    },
    leaderboards() {
      const { leaderboards } = this;

      const formattedGames = leaderboards.map((item, index) => {
        const { date } = item;

        return {
          rank: index + 1,
          ...item,
          date: formatDate(date),
        };
      });

      this.games = formattedGames;
    },
  },
  computed: {
    ...mapGetters(['leaderboards', 'luid']),
  },
  mounted() {
    this.displayGames({ autoScroll: false });
  },
  methods: {
    ...mapActions(['getLeaderboards']),
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
    setBest(showBest) {
      this.showBest = showBest;
    },
    async displayGames({ autoScroll }) {
      const {
        limit,
        showBest,
        $refs: { scrollTo },
      } = this;

      this.games = [];

      await this.getLeaderboards({
        limit,
        showBest,
      });

      if (autoScroll) {
        this.$emit('scrollTo', scrollTo);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.leaderboards {
  &__controls {
    display: flex;
    justify-content: space-between;
    padding: var(--pd-sm);
    margin-bottom: var(--mg-md);
    border: 1px solid var(--bdr-secondary);
  }
}
</style>
