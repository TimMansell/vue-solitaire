<template>
  <div>Moves: {{ moves }}</div>
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
