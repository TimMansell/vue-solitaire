<template>
  <button class="btn" :class="classes" @click="click">
    <RouterLink v-if="link" :to="link" tag="span">
      <slot />
    </RouterLink>
    <slot v-if="!link" />
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
    link: {
      type: String,
      default: '',
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

  &--large {
    font-size: var(--font-size-lg);
  }
}
</style>
