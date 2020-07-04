<template>
  <modal
    ref="modal"
    name="modal"
    classes="modal"
    height="auto"
    :scrollable="true"
    :reset="true"
    :adaptive="true"
    transition="scale"
  >
    <div class="modal__content" data-test="modal-content">
      <Button alt class="modal__close" @click="closeModal" data-test="close-modal">
        Close
      </Button>
      <slot />
    </div>
  </modal>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Controls',
  components: {
    Button,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$modal.hide('modal');
    },
  },
};
</script>

<style lang="scss">
.modal {
  &__close {
    position: absolute;
    right: calc(var(--vr) * 2);
  }

  &__content {
    padding: var(--pd-md);
    background-color: var(--bg-secondary);
    text-align: left;
    border-radius: var(--bdr-radius-sm);
    box-shadow: 0 0 20px -2px rgba($col-tertiary, 0.4);
    margin: var(--mg-md);
    left: 0;
    right: 0;
  }
}
</style>
