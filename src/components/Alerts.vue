<template>
  <div>
    <ConnectingAlert />
    <UpdatedAlert />
  </div>
</template>

<script>
import ConnectingAlert from '@/components/ConnectingAlert.vue';
import UpdatedAlert from '@/components/UpdatedAlert.vue';

export default {
  name: 'Alerts',
  components: {
    ConnectingAlert,
    UpdatedAlert,
  },
};
</script>
