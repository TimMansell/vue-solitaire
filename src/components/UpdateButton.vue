<template>
  <Button @click="updateApp()" data-test="update-btn"> Update </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'UpdateButton',
  components: {
    Button,
  },
  methods: {
    updateApp() {
      window.location.href = '/';
    },
  },
};
</script>
