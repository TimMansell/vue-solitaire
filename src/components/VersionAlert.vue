<template>
  <Toast
    v-if="!versionMatch"
    :msgs="['A new version of the website is available.']"
    btn-text="Update"
    :btn-click="refreshPage"
    blur-background
    data-test="version-alert"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toast from '@/components/Toast.vue';

export default {
  name: 'VersionAlert',
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(['versionMatch']),
  },
  watch: {
    versionMatch(versionMatch, versionMatchPrev) {
      if (versionMatch === versionMatchPrev) return;

      if (!versionMatch) {
        this.setGamePaused(true);
      }
    },
  },
  methods: {
    ...mapActions(['setGamePaused']),
    refreshPage() {
      window.location.href = '/';
    },
  },
};
</script>
