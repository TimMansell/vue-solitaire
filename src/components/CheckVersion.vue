<template>
  <Toast
    v-if="!versionMatch"
    title="Update available"
    :msgs="[
      'A new version of the website is available.',
      'Refresh your browser or click on update',
    ]"
    btn-text="Update"
    :btn-click="refreshPage"
    data-test="version"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'CheckVersion',
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
