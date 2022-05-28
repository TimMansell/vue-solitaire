<template>
  <button class="btn" :class="classes" @click="onClick" :disabled="isDisabled">
    <slot />
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      validator(value) {
        return ['default', 'alt', 'link', 'icon'].includes(value);
      },
      default: 'default',
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
    checkDisabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value);
      },
      default: 'md',
    },
    click: {
      type: Function,
      default: () => {},
    },
    route: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['isDisabledGame']),
    isDisabled() {
      const { isDisabledGame, checkDisabled } = this;

      if (checkDisabled) return isDisabledGame;

      return false;
    },
    classes() {
      const { type, isStacked, size, isDisabled } = this;

      return {
        'btn--alt': type === 'alt',
        'btn--link': type === 'link',
        'btn--is-stacked': isStacked,
        'btn--icon': type === 'icon',
        'btn--small': size === 'sm',
        'btn--large': size === 'lg',
        'btn--disabled': isDisabled,
      };
    },
  },
  methods: {
    ...mapActions(['goToRoute']),
    onClick() {
      const { route, goToRoute, click } = this;

      if (route) {
        goToRoute(route);
      }

      click();
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  background: var(--bg-primary);
  border: 1px solid var(--bdr-secondary);
  border-radius: var(--bdr-radius-md);
  padding: var(--pd-sm) var(--pd-xs);
  color: var(--text-primary);
  transition: all 0.2s;
  font-size: var(--font-size-sm);
  text-decoration: none;
  font-family: var(--font-family-primary);
  line-height: 1;
  text-shadow: 0 1px var(--col-primary-alt-3);

  @media (min-width: $bp-xs) {
    padding: var(--pd-sm);
  }

  @media (min-width: $bp-md) {
    font-size: var(--font-size);
  }

  &:hover {
    background: var(--col-primary-alt-2);
    cursor: pointer;
  }

  &--disabled {
    cursor: not-allowed !important;
  }

  &--icon {
    border: 0;
    text-shadow: none;

    &:hover {
      background: transparent;
      transform: scale(1.15);
    }
  }

  &--is-stacked {
    flex: 1;
    white-space: nowrap;

    & + & {
      border-left: 0;

      &:not(:last-of-type) {
        border-radius: 0;
      }
    }

    &:last-of-type:not(:first-of-type) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:first-of-type:not(:last-of-type) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &--alt {
    background: var(--bg-primary);

    &:hover {
      background: var(--bg-primary-alt);
    }
  }

  &--link {
    border: 0;
    padding: 0;

    &:hover {
      background: none;
      text-shadow: none;
    }
  }

  &--small {
    font-size: var(--font-size-sm);
  }

  &--large {
    font-size: var(--font-size-lg);
  }
}
</style>
