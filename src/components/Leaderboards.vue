<template>
  <div class="leaderboards" data-test="leaderboards">
    <p data-test="game-history-showing-games">Your username is: {{ luid }}</p>

    <div
      ref="scrollTo"
      class="leaderboards__controls"
      data-test="leaderboards-controls"
    >
      <Select
        v-model="query"
        label="Show Best"
        :items="['moves', 'time']"
        @select="setQuery"
      />

      <Select
        v-model="limit"
        label="Show Top"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <h2>Best {{ query }}</h2>

    <ResponsiveTable
      :headings="['Rank', 'Date', 'User', `${query}`]"
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
      query: 'moves',
    };
  },
  watch: {
    limit() {
      this.displayGames({ autoScroll: true });
    },
    query() {
      this.displayGames({ autoScroll: true });
    },
    leaderboards() {
      const { leaderboards, query } = this;

      const formattedGames = leaderboards.map(
        ({ date, uid, [query]: value }, index) => ({
          rank: index + 1,
          date: formatDate(date),
          uid,
          value,
        })
      );

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
    setQuery(query) {
      this.query = query;
    },
    async displayGames({ autoScroll }) {
      const {
        limit,
        query,
        $refs: { scrollTo },
      } = this;

      this.games = [];

      await this.getLeaderboards({
        limit,
        query,
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
