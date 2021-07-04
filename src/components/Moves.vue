<template>
  <div>
    Moves: <span data-test="moves">{{ moves }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Moves',
  computed: {
    ...mapGetters(['moves']),
  },
};
</script>
