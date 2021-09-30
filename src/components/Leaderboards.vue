<template>
  <div data-test="leaderboards">
    <p v-if="name" data-test="leaderboard-name">
      Your player name is: {{ name }}
    </p>

    <div ref="scrollTo">
      <Filters>
        <Select
          v-model="filters.showBest"
          label="Best"
          :items="['Moves', 'Times']"
          @select="setBest"
          data-test="leaderboard-set-best"
        />

        <Select
          v-model="filters.limit"
          label="Top"
          :items="['25', '50', '100', '500']"
          @select="displayLimit"
          data-test="leaderboard-set-top"
        />
      </Filters>
    </div>

    <p data-test="leaderboards-heading">Top {{ limit }} Best {{ showBest }}</p>

    <ResponsiveTable
      :headings="['Rank', 'Date', 'Player', `${showBest}`]"
      :items="leaderboards"
      :placeholder-rows="limit"
      :to-highlight="{ key: 'player', value: name }"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Filters from '@/components/Filters.vue';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';

export default {
  name: 'Leaderboards',
  components: {
    Filters,
    Select,
    ResponsiveTable,
  },
  data() {
    return {
      filters: {
        limit: parseInt(this.$route.params.limit, 10),
        showBest: this.$route.params.showBest,
      },
    };
  },
  watch: {
    filters: {
      async handler() {
        await this.displayGames();

        this.updateUrl();
        this.scrollTo();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['leaderboards', 'name']),
    showBest() {
      return this.filters.showBest;
    },
    limit() {
      return this.filters.limit;
    },
  },
  mounted() {
    this.displayGames();
  },
  methods: {
    ...mapActions(['getLeaderboards']),
    displayLimit(limit) {
      this.filters.limit = parseInt(limit, 10);
    },
    setBest(showBest) {
      this.filters.showBest = showBest;
    },
    async displayGames() {
      const { filters } = this;

      await this.getLeaderboards(filters);
    },
    scrollTo() {
      this.$emit('scrollTo', this.$refs.scrollTo);
    },
    updateUrl() {
      const { showBest, limit } = this;

      this.$router.push(`/leaderboards/${showBest}/${limit}`);
    },
  },
};
</script>
