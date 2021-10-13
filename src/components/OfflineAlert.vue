<template>
  <Toast
    v-if="!isOnline"
    :msgs="['Connection to the server has been lost.']"
    btn-text="How can I fix this?"
    :btn-click="offlineMode"
    data-test="offline-alert"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'OfflineAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['isOnline']),
  },
  methods: {
    offlineMode() {
      this.$router.push('/what-is-offline-mode');
    },
  },
};
</script>
