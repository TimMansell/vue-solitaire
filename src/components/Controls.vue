<template>
  <div class="controls">
    <button class="controls__btn" @click="restartGame" data-test="new-game">
      New Game
    </button>
    <div v-for="(value, key, index) in settings" :key="index">
      <input @change="updateSettings" type="checkbox" :id="index" v-model="settings[key]" />
      <label :for="index">Auto-reveal cards</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  data() {
    return {
      settings: this.$store.getters.settings,
    };
  },
  mounted() {
    this.$store.dispatch('getSettings');
  },
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
      this.$store.dispatch('initGame');
    },
    updateSettings() {
      const { settings } = this;

      this.$store.dispatch('updateSettings', settings);
    },
  },
};
</script>

<style lang="scss" scoped>
.controls {
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;

  &__btn {
    font-size: 1rem;
  }
}
</style>
