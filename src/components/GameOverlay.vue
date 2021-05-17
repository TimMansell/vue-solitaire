<template>
  <div class="game-overlay" :class="overlayClasses" data-test="game-overlay">
    <div class="game-overlay__container">
      <div class="game-overlay__content">
        <Logo class="game-overlay__logo" v-if="showLogo" />
        <h1 class="game-overlay__title">
          <slot name="title" />
        </h1>
        <div class="game-overlay__msg" v-if="hasMsgSlot">
          <slot name="msg" />
        </div>
        <div
          class="game-overlay__btns"
          :class="btnClasses"
          data-test="game-overlay-btns"
        >
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    showDivider: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    overlayClasses() {
      const { alt, centerContent } = this;

      return {
        'game-overlay--alt': alt,
        'game-overlay--centered': centerContent,
      };
    },
    btnClasses() {
      const { showDivider } = this;

      return {
        'game-overlay__btns--divider': showDivider,
      };
    },
    hasMsgSlot() {
      return !!this.$slots.msg;
    },
  },
  mounted() {
    // Stop body from scrolling when overlay is open.
    this.setHideBody('hidden');
    this.setTimerPaused(true);
  },
  destroyed() {
    // Enable body scrolling.
    this.setHideBody('auto');
    this.setTimerPaused(false);
  },
  methods: {
    ...mapActions(['setTimerPaused']),
    setHideBody(value) {
      document.body.style.overflow = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-overlay {
  display: grid;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100%;
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
      max-width: 90%;
      min-width: 60%;
    }

    @media (min-width: $bp-lg) {
      min-width: 50%;
    }

    @media (min-width: $bp-xl) {
      max-width: 40%;
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
    padding: var(--pd-md);
  }

  &__title {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
  }

  &__msg {
    display: flex;
    flex-direction: column;
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
    margin-bottom: var(--mg-md);
  }

  &__btns {
    display: flex;
    justify-content: center;

    &--divider {
      border-top: 1px solid rgba($col-secondary, 0.05);
      box-shadow: 0 -1px var(--bdr-secondary);
      padding-top: 1rem;
    }

    > * + * {
      margin-left: var(--vr);
    }
  }
}
</style>
