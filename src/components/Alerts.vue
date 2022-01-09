<template>
  <div>
    <ConnectingAlert />
    <OfflineAlert />
    <AppUpdatedAlert />
  </div>
</template>

<script>
import ConnectingAlert from '@/components/ConnectingAlert.vue';
import OfflineAlert from '@/components/OfflineAlert.vue';
import AppUpdatedAlert from '@/components/AppUpdatedAlert.vue';

export default {
  name: 'Alerts',
  components: {
    ConnectingAlert,
    OfflineAlert,
    AppUpdatedAlert,
  },
};
</script>
