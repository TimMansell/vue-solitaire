<template>
  <Button :route="route" data-test="show-board-btn"> {{ text }} Board </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ShowBoardButton',
  components: {
    Button,
  },
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    text() {
      return this.isShow ? 'Show' : 'Hide';
    },
    route() {
      const show = this.isShow ? 'hide' : '';

      return { name: 'lost', params: { show } };
    },
  },
};
</script>
