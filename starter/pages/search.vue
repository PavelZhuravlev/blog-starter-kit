<template>
  <div class="page">
    <client-only>
      <div v-if="!$fetchState.pending && searchStr" class="container">
        <div class="page-header">
          <h1 class="tl-1 page-title">
            Matching results for '{{ searchStr }}'
          </h1>
        </div>
        <div class="page-content">
          <Articles
            v-if="articles.length"
            :articles="articles"
            :lazy-params="articlesParams"
            :lazy-id="lazyId"
            lazy
          />
          <AppNotFound
            v-else
            :title="`We couldn't find any matches for '${searchStr}'.`"
            description="Double check your search for any typos or spelling errors - or try a different search term."
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
  fetchOnServer: false,
  async fetch() {
    const { q: queryStr } = this.$route.query;
    this.lazyId = +new Date();
    this.searchStr = queryStr || "";
    this.articlesParams = {
      _where: {
        _or: [
          { title_contains: this.searchStr },
          { description_contains: this.searchStr },
          { content_contains: this.searchStr },
          { "category.name_contains": this.searchStr },
          { "author.name_contains": this.searchStr },
        ],
      },
    };
    this.articles = this.searchStr
      ? await this.$loadArticles(this.articlesParams)
      : [];
  },
  async asyncData({ $strapi }) {
    return { global: await $strapi.find("global") };
  },
  data() {
    return {
      lazyId: "",
      searchStr: "",
      articles: [],
      articlesParams: {},
    };
  },
  watch: {
    "$route.query": "$fetch",
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;
    const fullSeo = {
      ...defaultSeo,
      metaTitle: `Search`,
      metaDescription: `Search results`,
      metaNoindex: true,
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
