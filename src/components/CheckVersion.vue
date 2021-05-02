<template>
  <Toast
    v-if="!doesVersionMatch"
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

import db from '@/services/db';

export default {
  name: 'CheckVersion',
  components: {
    Toast,
  },
  data() {
    return {
      doesVersionMatch: true,
    };
  },
  computed: {
    ...mapGetters(['version']),
  },
  async mounted() {
    const { version } = this;

    const {
      error,
      response: {
        version: { number },
      },
    } = await db.getAppVersion();

    if (!error) {
      this.doesVersionMatch = version === number;
    }
  },
  methods: {
    refreshPage() {
      window.location.href = '/';
    },
  },
};
</script>
