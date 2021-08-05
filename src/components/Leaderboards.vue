<template>
  <div class="leaderboards" data-test="leaderboards">
    <p>Are you the best of the best?</p>

    <div
      ref="scrollTo"
      class="leaderboards__controls"
      data-test="leaderboards-controls"
    >
      <Select
        v-model="limit"
        label="Show Top"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <p data-test="game-history-showing-games">
      Showing top {{ limit }} results
    </p>

    <ResponsiveTable
      :headings="['Rank', 'User', 'Moves']"
      :items="games"
      :placeholder-rows="limit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';

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
    leaderboards() {
      const { leaderboards, query } = this;

      const formattedGames = leaderboards.map(
        ({ uid, [query]: value }, index) => ({
          rank: index + 1,
          uid,
          value,
        })
      );

      this.games = formattedGames;
    },
  },
  computed: {
    ...mapGetters(['leaderboards', 'userGameCount']),
  },
  mounted() {
    this.displayGames({ autoScroll: false });
  },
  methods: {
    ...mapActions(['getLeaderboards']),
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
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
