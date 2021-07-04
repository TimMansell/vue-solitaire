<template>
  <div>
    Games:
    <Counter data-test="stats" :number="userGameCount" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  name: 'UserStats',
  components: {
    Counter,
  },
  computed: {
    ...mapGetters(['userGameCount']),
  },
};
</script>
