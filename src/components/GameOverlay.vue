<template>
  <div class="game-overlay" :class="overlayClasses" data-test="game-overlay">
    <div
      class="game-overlay__close"
      title="Close Overlay"
      v-if="showClose"
      data-test="game-overlay-close"
    >
      <Button
        route="home"
        type="icon"
        size="lg"
        data-test="game-overlay-close-btn"
      >
        <FontAwesomeIcon :icon="closeIcon" />
      </Button>
    </div>
    <div class="game-overlay__container">
      <div class="game-overlay__content">
        <div :class="visibilityClasses">
          <Logo
            class="game-overlay__logo"
            v-if="showLogo"
            data-test="game-overlay-logo"
          />
          <h1 data-test="game-overlay-header">
            <slot name="title" />
          </h1>
          <div
            class="game-overlay__msg"
            v-if="hasMsgSlot"
            data-test="game-overlay-msg"
          >
            <slot name="msg" />
          </div>
        </div>
        <span
          class="game-overlay__btns"
          :class="buttonClasses"
          v-if="hasBtnSlot"
          data-test="game-overlay-btns"
        >
          <slot name="buttons" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Button from './Button.vue';
import Logo from './Logo.vue';

export default {
  name: 'GameOverlay',
  components: {
    Button,
    Logo,
    FontAwesomeIcon,
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
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeIcon: faTimesCircle,
    };
  },
  computed: {
    ...mapGetters(['isOverlayVisible']),
    overlayClasses() {
      const { centerContent, isOverlayVisible } = this;

      return {
        'game-overlay--centered': centerContent,
        'game-overlay--see-through': !isOverlayVisible,
      };
    },
    buttonClasses() {
      const { isOverlayVisible } = this;

      return {
        'game-overlay__btns--is-visible': !isOverlayVisible,
      };
    },
    visibilityClasses() {
      const { isOverlayVisible } = this;

      return {
        'is-visible': isOverlayVisible,
        'is-not-visible': !isOverlayVisible,
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
  },
  unmounted() {
    // Enable body scrolling.
    this.setHideBody(false);
  },
  methods: {
    setHideBody(value) {
      const overflow = value ? 'hidden' : 'auto';

      document.body.style.overflow = overflow;
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
  background: var(--bg-primary);
  z-index: var(--z-overlay);
  overflow-y: auto;

  @media (min-width: $bp-md) {
    @supports (backdrop-filter: blur(var(--blur))) {
      background: var(--bg-primary-alt-3);
      animation: blur-animation-to var(--animation-speed) forwards;
    }
  }

  &--centered {
    text-align: center;
  }

  &--see-through {
    background: transparent;

    @supports (backdrop-filter: blur(var(--blur))) {
      animation: blur-animation-from var(--animation-speed) forwards;
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
    @media (min-width: $bp-sm) {
      justify-self: center;
      max-width: 90%;
      min-width: 70%;
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
    text-shadow: 0 1px var(--col-primary-alt-3);

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
    padding: var(--mg-sm);

    &--is-visible {
      @media (min-width: $bp-md) {
        padding: var(--mg-md);
        background: var(--bg-secondary);
        border: 1px solid var(--col-primary-alt-2);
        border-radius: var(--bdr-radius-lg);
      }
    }
  }
}

.is-not-visible {
  visibility: hidden;
  opacity: 0;
  /* stylelint-disable declaration-colon-newline-after */
  transition: visibility 0s linear var(--animation-speed),
    opacity var(--animation-speed);
  /* stylelint-enable declaration-colon-newline-after */
}

.is-visible {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity var(--animation-speed);
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
