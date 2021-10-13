<template>
  <div class="toast" :class="classes">
    <div class="toast__wrapper">
      <div class="toast__content">
        <div class="toast__msg">
          <div v-for="(msg, index) in msgs" :key="index">
            {{ msg }}
          </div>
        </div>
      </div>
      <Button type="alt" size="sm" @click="btnClick">
        {{ btnText }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Toast',
  components: {
    Button,
  },
  props: {
    msgs: {
      type: Array,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnClick: {
      type: Function,
      default: () => {},
    },
    position: {
      type: String,
      validator(value) {
        return ['top-right', 'bottom-center'].includes(value);
      },
      default: 'bottom-center',
    },
  },
  computed: {
    classes() {
      const { position } = this;

      return {
        'toast--top-right': position === 'top-right',
        'toast--bottom-center': position === 'bottom-center',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: calc(var(--z-overlay) - 1);
  padding: var(--pd-sm);
  color: var(--col-tertiary);

  @media (min-width: $bp-sm) {
    width: auto;
  }

  &--bottom-center {
    justify-content: center;
    bottom: 0;
    left: 0;
    right: 0;

    @media (min-width: $bp-sm) {
      bottom: var(--mg-md);
    }

    @media (min-width: $bp-md) {
      bottom: var(--mg-xl);
    }
  }

  &--top-right {
    top: 0;
    right: 0;
  }

  &__wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid var(--bdr-secondary);
    border-radius: 7px;
    padding: var(--pd-sm);
    background: var(--bg-secondary);

    @media (min-width: $bp-sm) {
      flex: none;
      flex-direction: row;
      align-items: center;
    }
  }

  &__content {
    flex: 1;
    width: 100%;
    text-align: left;
  }

  &__msg {
    margin-bottom: var(--mg-xs);
    font-size: var(--font-size-sm);
    text-align: center;

    @media (min-width: $bp-sm) {
      margin-bottom: 0;
      margin-right: var(--mg-md);
    }
  }
}
</style>
