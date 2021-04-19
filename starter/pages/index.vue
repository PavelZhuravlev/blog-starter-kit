<template>
  <div class="page page-home">
    <div class="container">
      <div class="page-header">
        <h1 class="tl-1 page-title">{{ homepage.hero.title }}</h1>
      </div>
      <div class="page-content">
        <Articles v-if="articles.length" :articles="articles" lazy />
        <AppNotFound v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Articles from "~/components/Articles";
import AppNotFound from "~/components/AppNotFound";
import { getMetaTags } from "~/utils/seo";

export default {
  components: {
    Articles,
    AppNotFound,
  },
  async asyncData({ $strapi, $loadArticles }) {
    return {
      articles: await $loadArticles(),
      homepage: await $strapi.find("homepage"),
      global: await $strapi.find("global"),
    };
  },
  head() {
    const { seo } = this.homepage;
    const { defaultSeo, favicon, siteName } = this.global;
    const fullSeo = {
      ...defaultSeo,
      ...seo,
    };

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: favicon.url,
        },
      ],
    };
  },
};
</script>
