<template>
  <div class="game-overlay" :class="overlayClasses" data-test="game-overlay">
    <div
      class="game-overlay__close"
      v-if="btnClose"
      title="Close Overlay"
      data-test="game-overlay-close"
    >
      <Button
        type="icon"
        size="lg"
        @click="btnClose"
        data-test="game-overlay-close-btn"
      >
        x
      </Button>
    </div>
    <div class="game-overlay__container">
      <div class="game-overlay__content">
        <Logo
          class="game-overlay__logo"
          v-if="showLogo"
          data-test="game-overlay-logo"
        />
        <h1>
          <slot name="title" />
        </h1>
        <div class="game-overlay__msg" v-if="hasMsgSlot">
          <slot name="msg" />
        </div>
        <div
          class="game-overlay__btns"
          v-if="hasBtnSlot"
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
import Button from './Button.vue';
import Logo from './Logo.vue';

export default {
  name: 'GameOverlay',
  components: {
    Button,
    Logo,
  },
  props: {
    centerContent: {
      type: Boolean,
      default: false,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    btnClose: {
      type: Function,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    overlayClasses() {
      const { centerContent, visible } = this;

      return {
        'game-overlay--centered': centerContent,
        'game-overlay--see-through': !visible,
      };
    },
    hasMsgSlot() {
      return !!this.$slots.msg;
    },
    hasBtnSlot() {
      return !!this.$slots.buttons;
    },
  },
  mounted() {
    // Stop body from scrolling when overlay is open.
    this.setHideBody(true);
    this.setTimerPaused(true);
  },
  destroyed() {
    // Enable body scrolling.
    this.setHideBody(false);
    this.setTimerPaused(false);
  },
  methods: {
    ...mapActions(['setTimerPaused']),
    setHideBody(value) {
      const overflow = value ? 'hidden' : 'auto';

      document.body.style.overflow = overflow;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-overlay {
  --blur: 10px;

  display: grid;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100%;
  background: var(--bg-primary);
  z-index: var(--z-overlay);
  overflow-y: auto;

  @media (min-width: $bp-md) {
    @supports (backdrop-filter: blur(var(--blur))) {
      background: rgba($col-primary, 0.85);
      animation: blur-animation-to 0.4s forwards;
    }
  }

  &--centered {
    text-align: center;
  }

  &--see-through {
    background: rgba($col-primary, 0.85);

    @supports (backdrop-filter: blur(var(--blur))) {
      animation: blur-animation-from 0.4s forwards;
    }
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%, 10%);
    opacity: 0.8;
  }

  &__container {
    justify-self: center;

    @media (min-width: $bp-md) {
      max-width: 90%;
      min-width: 60%;
    }

    @media (min-width: $bp-xl) {
      max-width: 60%;
      min-width: 40%;
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
    padding: var(--pd-sm);
    text-shadow: 0 1px var(--col-primary-dark-2);

    @media (min-width: $bp-md) {
      padding: var(--pd-md);
    }
  }

  &__msg {
    display: flex;
    flex-direction: column;
    color: var(--text-primary);
  }

  &__btns {
    display: flex;
    justify-content: center;
    margin-top: var(--mg-sm);

    > * + * {
      margin-left: var(--mg-md);
    }
  }
}

@keyframes blur-animation-to {
  0% {
    backdrop-filter: blur(0);
  }

  100% {
    backdrop-filter: blur(var(--blur));
  }
}

@keyframes blur-animation-from {
  0% {
    backdrop-filter: blur(var(--blur));
  }

  100% {
    backdrop-filter: blur(0);
  }
}
</style>
