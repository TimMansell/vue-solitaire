<template>
  <Button :click="reconnect" data-test="reconnect-btn"> Reconnect </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ReconnectButton',
  components: {
    Button,
  },
  methods: {
    reconnect() {
      window.location.href = '/';
    },
  },
};
</script>
