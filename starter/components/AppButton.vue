<template>
  <component
    :is="type"
    :to="href"
    :class="{
      'button-primary': primary,
      'button-dark': dark,
      'button-full-width': fullWidth,
      'button-disabled': disabled,
    }"
    class="button"
  >
    <span class="button-inner">
      <span class="tl-5 button-label">
        <slot></slot>
      </span>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    type() {
      return this.href ? "nuxt-link" : "button";
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  $this: &;
  display: inline-block;
  @include padding(null 15px);
  background-color: clr(light);
  color: clr(typo);
  &-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: $form-el-height;
  }
  &-label {
    color: inherit;
  }
  &-dark {
    background-color: clr(dark);
    color: clr(light);
  }
  &-primary {
    background-color: clr(primary);
    color: clr(light);
  }
  &-full-width {
    width: 100%;
    display: block;
  }
  &-disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
