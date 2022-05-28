<template>
  <Button :click="toggleOverlayVisibility" data-test="show-board-btn">
    {{ text }} Board
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Button from './Button.vue';

export default {
  name: 'ShowBoardButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isOverlayVisible']),
    text() {
      const { isOverlayVisible } = this;

      const text = isOverlayVisible ? 'Show' : 'Hide';

      return text;
    },
  },
  methods: {
    ...mapActions(['toggleOverlayVisibility']),
  },
};
</script>
