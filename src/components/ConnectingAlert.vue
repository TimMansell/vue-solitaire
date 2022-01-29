<template>
  <Toast
    :show="isConnecting"
    :msgs="['Connecting to game server']"
    :duration="500"
    data-test="connecting-alert"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'ConnectingAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['isConnecting']),
  },
};
</script>
