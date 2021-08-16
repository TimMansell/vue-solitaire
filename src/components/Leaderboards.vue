<template>
  <div data-test="leaderboards">
    <p v-if="name" data-test="leaderboard-name">
      Your player name is: {{ name }}
    </p>

    <div ref="scrollTo">
      <Filters>
        <Select
          v-model="showBest"
          label="Best"
          :items="['Moves', 'Times']"
          @select="setBest"
          data-test="leaderboard-set-best"
        />

        <Select
          v-model="limit"
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
      limit: 25,
      showBest: 'Moves',
    };
  },
  watch: {
    async limit() {
      await this.displayGames();

      this.scrollTo();
    },
    async showBest() {
      await this.displayGames();

      this.scrollTo();
    },
  },
  computed: {
    ...mapGetters(['leaderboards', 'name']),
  },
  mounted() {
    this.displayGames();
  },
  methods: {
    ...mapActions(['getLeaderboards']),
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
    setBest(showBest) {
      this.showBest = showBest;
    },
    async displayGames() {
      const { limit, showBest } = this;

      await this.getLeaderboards({
        limit,
        showBest,
      });
    },
    scrollTo() {
      this.$emit('scrollTo', this.$refs.scrollTo);
    },
  },
};
</script>
