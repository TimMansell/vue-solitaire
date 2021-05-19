<template>
  <button class="btn" :class="classes" @click="click">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    alt: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { alt, link, isStacked, hasIcon, isLarge } = this;

      return {
        'btn--alt': alt,
        'btn--link': link,
        'btn--is-stacked': isStacked,
        'btn--has-icon': hasIcon,
        'btn--is-large': isLarge,
      };
    },
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  background: transparent;
  border: 1px solid var(--bdr-primary);
  border-radius: var(--bdr-radius-md);
  padding: var(--pd-sm);
  color: var(--text-primary);
  transition: all 0.2s;
  font-size: var(--font-size);
  text-decoration: none;
  font-family: var(--font-family);
  line-height: 1;

  @media (min-width: $bp-md) {
    font-size: var(--font-size-lg);
    font-weight: 700;
    border-width: 2px;
  }

  &:hover {
    background: var(--bg-primary);
    cursor: pointer;
  }

  &--has-icon {
    border: 0;

    &:hover {
      background: transparent;
      color: var(--col-primary-dark);
    }
  }

  &--is-stacked {
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
      background: var(--bg-primary-light);
    }
  }

  &--link {
    border: 0;
    font-weight: 500;
    padding: 0;

    &:hover {
      background: none;
      text-decoration: underline;
    }
  }

  &--is-large {
    font-size: 1.5rem;
  }
}
</style>
