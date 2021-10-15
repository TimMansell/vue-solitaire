<template>
  <div>
    <Table
      :headings="headings"
      :items="userStats"
      :placeholder-rows="2"
      data-test="user-stats"
    />
    <h1>Global Stats</h1>
    <Table
      :headings="headings"
      :items="globalStats"
      :placeholder-rows="2"
      data-test="global-stats"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Table from '@/components/Table.vue';

export default {
  name: 'Stats',
  components: {
    Table,
  },
  computed: {
    ...mapGetters(['userStats', 'globalStats']),
    headings() {
      return ['Played', 'Won', 'Lost', 'Gave Up'];
    },
  },
  methods: {
    ...mapActions(['getStats', 'clearStats']),
  },
  mounted() {
    this.getStats();
  },
};
</script>
