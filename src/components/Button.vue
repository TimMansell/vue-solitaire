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
  },
  computed: {
    classes() {
      const { alt } = this;

      return {
        'btn--alt': alt,
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

<style lang="scss">
.btn {
  background: transparent;
  border: 1px solid $bdr-primary;
  border-radius: $bdr-radius-md;
  padding: $pd-sm;
  color: $text-primary;
  transition: all 0.2s;
  font-weight: 700;
  font-size: $font-size;
  text-decoration: none;
  font-family: $font-family;

  @media (min-width: $bp-sm) {
    font-size: $font-size-lg;
    border-width: 2px;
  }

  &:hover {
    background: $bg-primary;
    cursor: pointer;
  }

  & + & {
    border-left: 0;
  }

  &:last-of-type:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:first-of-type:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &--alt {
    background: $bg-primary;

    &:hover {
      background: lighten($bg-primary, 5%);
    }
  }
}
</style>
