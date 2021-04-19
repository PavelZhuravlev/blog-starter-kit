<template>
  <div class="page">
    <client-only>
      <div class="container">
        <div class="page-header">
          <h1 class="tl-1 page-title">{{ category.name }}</h1>
        </div>
        <div class="page-content">
          <Articles
            v-if="articles.length"
            :articles="articles"
            :lazy-params="articlesParams"
            lazy
          />
          <AppNotFound
            v-else
            :title="`Sorry, ${category.name} category doesn't contain articles.`"
            description="Looks like no one has yet added an article with this category."
          />
        </div>
      </div>
    </client-only>
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
  async asyncData({ $strapi, $loadArticles, params }) {
    const searchStr = params.slug || "";
    const articlesParams = { "category.slug": searchStr };
    const matchingCategories = await $strapi.find("categories", {
      slug: searchStr,
    });
    return {
      global: await $strapi.find("global"),
      articles: await $loadArticles(articlesParams),
      articlesParams: articlesParams,
      category: matchingCategories[0],
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;
    const fullSeo = {
      ...defaultSeo,
      metaTitle: `${this.category.name} articles`,
      metaDescription: `All articles about ${this.category.name}`,
    };

    return {
      title: fullSeo.metaTitle,
      titleTemplate: `%s | ${siteName}`,
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
