<template>
  <div>
    <Toast
      :show="hasConnected"
      :msgs="['Connected to game server']"
      data-test="connected-alert"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'ConnectedAlert',
  components: {
    Toast,
  },
  data() {
    return {
      duration: 3000,
    };
  },
  computed: {
    ...mapGetters(['hasConnected']),
  },
  methods: {
    ...mapActions(['setHasConnected']),
  },
  watch: {
    hasConnected(hasConnected) {
      if (!hasConnected) return;

      setTimeout(() => {
        this.setHasConnected(false);
      }, this.duration);
    },
  },
};
</script>
