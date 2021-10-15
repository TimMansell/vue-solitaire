<template>
  <transition :duration="duration">
    <div class="toast" :class="classes" data-test="toast">
      <div class="toast__wrapper">
        <div class="toast__content">
          <div class="toast__msg">
            <div v-for="(msg, index) in msgs" :key="index">
              {{ msg }}
            </div>
          </div>
        </div>
        <div class="toast__button" v-if="btnText">
          <Button type="alt" @click="btnClick">
            {{ btnText }}
          </Button>
        </div>
      </div>
    </div>
  </transition>
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
      default: '',
    },
    btnClick: {
      type: Function,
      default: () => {},
    },
    position: {
      type: String,
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
      default: 'primary',
    },
    duration: {
      type: Number,
      default: 0,
    },
    blurBackground: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { position, blurBackground } = this;

      return {
        'toast--primary': position === 'primary',
        'toast--secondary': position === 'secondary',
        'toast--blur': blurBackground,
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

  &--blur {
    &::after {
      position: fixed;
      z-index: -1;
      content: '';
      inset: 0;
      background: var(--bg-primary);

      /* stylelint-disable max-nesting-depth */
      @supports (backdrop-filter: blur(var(--blur))) {
        background: var(--bg-primary-alt-3);
        backdrop-filter: blur(var(--blur));
      }
      /* stylelint-enable max-nesting-depth */
    }
  }

  &--secondary {
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

  &--primary {
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
    font-size: var(--font-size-sm);
    text-align: center;

    @media (min-width: $bp-xs) {
      font-size: var(--font-size);
    }
  }

  &__button {
    margin-top: var(--mg-xs);
    display: flex;
    justify-content: center;

    @media (min-width: $bp-sm) {
      margin-left: var(--mg-md);
      margin-top: 0;
    }
  }
}
</style>
