<template>
  <div class="leaderboards" data-test="leaderboards">
    <p data-test="game-history-showing-games">
      Your player name is: {{ luid }}
    </p>

    <div ref="scrollTo">
      <Filters>
        <Select
          v-model="showBest"
          label="Best"
          :items="['Moves', 'Times']"
          @select="setBest"
        />

        <Select
          v-model="limit"
          label="Top"
          :items="['25', '50', '100', '500']"
          @select="displayLimit"
        />
      </Filters>
    </div>

    <p>Top {{ limit }} Best {{ showBest }}</p>

    <ResponsiveTable
      :headings="['Rank', 'Date', 'Player', `${showBest}`]"
      :items="leaderboards"
      :placeholder-rows="limit"
      :to-highlight="{ key: 'uid', value: luid }"
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
    ...mapGetters(['leaderboards', 'luid']),
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
