<template>
  <Button :route-params="params" data-test="show-board-btn">
    {{ text }} Board
  </Button>
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
      const { isShow } = this;

      const text = isShow ? 'Show' : 'Hide';

      return text;
    },
    params() {
      const { isShow } = this;

      const show = isShow ? 'hide' : '';

      return { show };
    },
  },
};
</script>
