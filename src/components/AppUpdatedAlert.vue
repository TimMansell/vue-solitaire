<template>
  <Toast
    v-if="isOutdated && userGameCount > 0"
    :msgs="['App has been updated to v2.3.0']"
    :duration="3000"
    data-test="updated-alert"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'AppUpdatedAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['isOutdated', 'userGameCount']),
  },
  mounted() {
    this.setUpdateApp(false);
  },
  methods: {
    ...mapActions(['setUpdateApp']),
  },
};
</script>
