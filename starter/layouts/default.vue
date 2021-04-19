<template>
  <div class="page-outer">
    <AppHeader :category-list="categoryList" />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  async fetch() {
    this.categoryList = await this.$strapi.find("categories");
  },
  data: function () {
    return {
      categoryList: [],
    };
  },
};
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}

.page {
  flex: 1;
  padding-bottom: 80px;

  &-outer {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-top: $header-height;
  }
}
</style>
