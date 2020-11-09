<template>
  <div>
    Games: <span data-test="stats">{{ userStats.gameNumber }}</span> (<ViewStatsButton
      :load-stats="getUserStats"
    />)
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'Stats',
  components: {
    ViewStatsButton,
  },
  computed: {
    ...mapGetters(['userStats']),
  },
  methods: {
    ...mapActions(['getUserStats']),
  },
};
</script>
