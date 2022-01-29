<template>
  <Button @click="reconnect()" data-test="reconnect-btn"> Reconnect </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ReconnectButton',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['setIsOnline']),
    reconnect() {
      this.setIsOnline(true);
      window.location.href = '/';
    },
  },
};
</script>
