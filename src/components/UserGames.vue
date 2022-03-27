<template>
  <div>
    Games:
    <Counter data-test="user-games" :number="userGameCount" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  name: 'UserGames',
  components: {
    Counter,
  },
  computed: {
    ...mapGetters(['userGameCount']),
  },
};
</script>
