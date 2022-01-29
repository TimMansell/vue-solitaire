<template>
  <Toast
    :show="hasGameUpdated"
    :msgs="['Game has been updated to latest version']"
    :duration="3000"
    :timer="true"
    data-test="updated-alert"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'UpdatedAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['hasGameUpdated']),
  },
};
</script>
