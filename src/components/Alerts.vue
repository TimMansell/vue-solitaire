<template>
  <div>
    <ConnectingAlert />
    <ConnectedAlert />
    <UpdatedAlert />
  </div>
</template>

<script>
import ConnectingAlert from '@/components/ConnectingAlert.vue';
import ConnectedAlert from '@/components/ConnectedAlert.vue';
import UpdatedAlert from '@/components/UpdatedAlert.vue';

export default {
  name: 'Alerts',
  components: {
    ConnectingAlert,
    ConnectedAlert,
    UpdatedAlert,
  },
};
</script>
