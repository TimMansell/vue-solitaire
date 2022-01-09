<template>
  <transition :duration="duration">
    <div class="toast" data-test="toast">
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
  },
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 4vh;
  width: 100%;
  z-index: calc(var(--z-overlay) + 1);
  padding: var(--pd-sm);
  color: var(--col-tertiary);

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid var(--bdr-secondary);
    border-radius: var(--bdr-radius-lg);
    padding: var(--pd-sm);
    background: var(--bg-secondary);
    box-shadow: 0 0 var(--bdr-radius-lg) 2px var(--col-primary);
  }

  &__content {
    flex: 1;
    width: 100%;
    text-align: left;
  }

  &__msg {
    font-size: var(--font-size-sm);
    text-align: center;

    @media (min-width: $bp-sm) {
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
