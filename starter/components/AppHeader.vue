<template>
  <div class="header">
    <div class="container">
      <div class="header-inner">
        <div class="header-side header-side-left">
          <div class="header-logo-container">
            <nuxt-link to="/" aria-label="Go to Home Page">
              <div class="header-logo"></div>
            </nuxt-link>
          </div>
        </div>
        <div class="header-side header-side-right">
          <div v-if="categoryList.length" class="header-nav">
            <ul class="header-nav-items">
              <li
                v-for="category in categoryList"
                :key="category.id"
                class="header-nav-item"
              >
                <nuxt-link
                  :to="{
                    name: 'categories-slug',
                    params: { slug: category.slug },
                  }"
                  class="header-nav-link"
                >
                  <span class="tl-5 header-nav-label">{{ category.name }}</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <AppSearchbox class="header-searchbox" @submit="submitSearch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSearchbox from "~/components/AppSearchbox";
export default {
  components: {
    AppSearchbox,
  },
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    submitSearch(searchStr) {
      this.$router.push({
        path: "/search",
        query: {
          q: searchStr,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  $this: &;
  display: flex;
  justify-content: center;
  @include position(fixed, 0 0 null 0);
  background-color: clr(light);
  z-index: z(fixed-elems) + 1;

  &-inner {
    display: flex;
    justify-content: space-between;
    min-height: $header-height;
  }

  &-side {
    display: flex;
    align-items: center;
  }

  &-logo {
    @include size(100px, 30px);
    background-color: clr(dark);

    &-container {
      font-size: 0;
      line-height: 0;
    }
  }

  &-nav {
    &-items {
      display: flex;
      align-items: center;
    }

    &-item {
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }

    &-link {
      display: block;
    }

    &-label {
    }
  }
  &-searchbox {
    margin-left: 20px;
  }
}
</style>
