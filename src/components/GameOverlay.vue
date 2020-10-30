<template>
  <div class="game-overlay" :class="classes" data-test="game-overlay">
    <div class="game-overlay__content">
      <Logo class="game-overlay__logo" />
      <h1 class="game-overlay__title">
        <slot name="title" />
      </h1>
      <div class="game-overlay__msg" v-if="hasMsgSlot">
        <slot name="msg" />
      </div>
      <div class="game-overlay__btn" data-test="game-overlay-btn">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Logo from './Logo.vue';

export default {
  name: 'GameOverlay',
  components: {
    Logo,
  },
  props: {
    alt: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isGamePaused']),
    classes() {
      const { alt } = this;

      return {
        'game-overlay--alt': alt,
      };
    },
    hasMsgSlot() {
      return !!this.$slots.msg;
    },
  },
  destroyed() {
    const isPaused = {
      isPaused: false,
      isActive: false,
      showMsg: false,
    };

    this.setGamePaused(isPaused);
  },
  methods: {
    ...mapActions(['setGamePaused']),
  },
};
</script>

<style lang="scss" scoped>
.game-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($col-tertiary, 0.7);
  z-index: var(--z-overlay);
  text-align: center;

  &--alt {
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
  }

  &__logo {
    width: 100px;

    @media (min-width: $bp-md) {
      width: 150px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: var(--pd-lg);
    padding-right: var(--pd-lg);
  }

  &__title {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
  }

  &__msg {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
    margin-bottom: var(--mg-md);
  }
}
</style>
