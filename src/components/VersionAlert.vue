<template>
  <Toast
    v-if="!versionMatch"
    :msgs="['A new version of the website is available.']"
    position="top-right"
    btn-text="Update"
    :btn-click="refreshPage"
    data-test="version-alert"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'VersionAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['versionMatch']),
  },
  methods: {
    refreshPage() {
      window.location.href = '/';
    },
  },
};
</script>
