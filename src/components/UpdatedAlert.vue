<template>
  <Toast
    :show="hasGameUpdated"
    :msgs="['Game has been updated to latest version']"
    data-test="updated-alert"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'UpdatedAlert',
  components: {
    Toast,
  },
  data() {
    return {
      duration: 3000,
    };
  },
  computed: {
    ...mapGetters(['hasGameUpdated']),
  },
  mounted() {
    setTimeout(() => {
      this.setHasUpdated(false);
    }, this.duration);
  },
  methods: {
    ...mapActions(['setHasUpdated']),
  },
};
</script>
