<template>
  <div class="searchbox">
    <form class="searchbox-form" @submit.prevent="submit()">
      <div class="searchbox-inner">
        <AppInput class="searchbox-input">
          <input v-model="value" :placeholder="placeholder" type="text" />
        </AppInput>
        <AppButton dark class="searchbox-button">Search</AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import AppInput from "~/components/AppInput";
import AppButton from "~/components/AppButton";
export default {
  components: {
    AppInput,
    AppButton,
  },
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    clear() {
      this.value = "";
    },
    submit() {
      const value = this.value.trim().toLowerCase();
      if (!value) {
        return null;
      }
      this.$emit("submit", value);
      this.clear();
    },
  },
};
</script>

<style scoped lang="scss">
.searchbox {
  &-inner {
    display: flex;
  }
}
</style>
