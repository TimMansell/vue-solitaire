<template>
  <div class="game-overlay" :class="classes" data-test="game-overlay">
    <div class="game-overlay__container">
      <div class="game-overlay__content">
        <Logo class="game-overlay__logo" v-if="showLogo" />
        <h1 class="game-overlay__title">
          <slot name="title" />
        </h1>
        <div class="game-overlay__msg" v-if="hasMsgSlot">
          <slot name="msg" />
        </div>
        <div class="game-overlay__btns" data-test="game-overlay-btns">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    centerContent: {
      type: Boolean,
      default: false,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { alt, centerContent } = this;

      return {
        'game-overlay--alt': alt,
        'game-overlay--centered': centerContent,
      };
    },
    hasMsgSlot() {
      return !!this.$slots.msg;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-overlay {
  display: grid;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($col-tertiary, 0.7);
  z-index: var(--z-overlay);
  overflow-y: auto;

  &--alt {
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
  }

  &--centered {
    text-align: center;
  }

  &__container {
    justify-self: center;

    @media (min-width: $bp-md) {
      width: 80%;
    }

    @media (min-width: $bp-xl) {
      width: 40%;
    }
  }

  &__logo {
    @media (orientation: landscape) and (pointer: coarse) {
      display: none;
    }

    @media (orientation: landscape) and (min-width: $bp-lg) {
      display: inherit;
    }
  }

  &__content {
    padding: var(--pd-lg);
  }

  &__title {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
  }

  &__msg {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
    margin-bottom: var(--mg-lg);
  }

  &__btns {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
