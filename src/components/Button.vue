<template>
  <button class="btn" :class="classes" @click="click">
    <slot />
  </button>
</template>

<script>
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
    size: {
      type: String,
      validator(value) {
        return ['md', 'lg'].includes(value);
      },
      default: 'md',
    },
  },
  computed: {
    classes() {
      const { type, isStacked, size } = this;

      return {
        'btn--alt': type === 'alt',
        'btn--link': type === 'link',
        'btn--is-stacked': isStacked,
        'btn--icon': type === 'icon',
        'btn--large': size === 'lg',
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
  text-shadow: 0 1px var(--col-tertiary);

  @media (min-width: $bp-md) {
    font-size: var(--font-size-lg);
    font-weight: 700;
    border-width: 2px;
    text-shadow: 0 2px var(--col-tertiary);
  }

  &:hover {
    background: var(--bg-primary);
    cursor: pointer;
  }

  &--icon {
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
      text-shadow: none;
    }
  }

  &--large {
    font-size: var(--font-size-xl);
  }
}
</style>
