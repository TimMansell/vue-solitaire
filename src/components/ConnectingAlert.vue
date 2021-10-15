<template>
  <Toast
    v-if="isConnecting"
    :msgs="['Connecting to game server']"
    position="secondary"
    :duration="1000"
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
