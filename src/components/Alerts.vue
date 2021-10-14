<template>
  <div>
    <ConnectingAlert />
    <OfflineAlert />
  </div>
</template>

<script>
import ConnectingAlert from '@/components/ConnectingAlert.vue';
import OfflineAlert from '@/components/OfflineAlert.vue';

export default {
  name: 'Alerts',
  components: {
    ConnectingAlert,
    OfflineAlert,
  },
};
</script>
