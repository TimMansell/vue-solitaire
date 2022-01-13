<template>
  <div>
    <ConnectingAlert />
    <OfflineAlert />
    <UpdatedAlert />
  </div>
</template>

<script>
import ConnectingAlert from '@/components/ConnectingAlert.vue';
import OfflineAlert from '@/components/OfflineAlert.vue';
import UpdatedAlert from '@/components/UpdatedAlert.vue';

export default {
  name: 'Alerts',
  components: {
    ConnectingAlert,
    OfflineAlert,
    UpdatedAlert,
  },
};
</script>
