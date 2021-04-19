<template>
  <div class="page page-article">
    <div class="container">
      <div class="page-header">
        <h1 class="tl-1 page-title">{{ article.title }}</h1>
        <p v-if="publishedDate" class="tx-big fw-bold">
          {{ publishedDate }}
        </p>
        <div v-if="article.author" class="page-author">
          <AppAvatar :size="100" :image="article.author.picture" />
          <p class="tx-big page-author-name">{{ article.author.name }}</p>
          <p v-if="article.author.email" class="tx-default page-author-email">
            <a class="clr-primary" :href="`mailto:${article.author.email}`">
              {{ article.author.email }}
            </a>
          </p>
        </div>
        <ArticleSharing :seo="fullSeo" />
        <CldImage
          lqip
          :ratio="1.5"
          :image="article.image"
          class="page-banner"
        ></CldImage>
      </div>
      <div class="page-content">
        <AppMarkdown :markdown="article.content" :images="contentImages" />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import CldImage from "~/components/CldImage";
import AppAvatar from "~/components/AppAvatar";
import AppMarkdown from "~/components/AppMarkdown";
import ArticleSharing from "~/components/ArticleSharing";
import { loadMarkdownImages } from "~/utils/markdown";
import { getMetaTags } from "~/utils/seo";

export default {
  components: { AppMarkdown, CldImage, AppAvatar, ArticleSharing },
  async asyncData({ $strapi, $loadArticles, params: { slug } }) {
    const articles = await $loadArticles({ slug });
    const article = articles[0];
    return {
      article: article,
      global: await $strapi.find("global"),
      contentImages: await loadMarkdownImages($strapi, article.content),
    };
  },
  computed: {
    publishedDate() {
      return (
        this.article.publishedAt &&
        format(new Date(this.article.publishedAt), "MMM do yy")
      );
    },
    fullSeo() {
      const { defaultSeo, favicon, siteName } = this.global;
      return {
        ...defaultSeo,
        metaTitle: this.article.title,
        metaDescription: this.article.description,
        shareImage: this.article.image,
        favicon,
        siteName,
      };
    },
  },
  head() {
    const { siteName, metaTitle, favicon } = this.fullSeo;
    return {
      titleTemplate: `%s | ${siteName}`,
      title: metaTitle,
      meta: getMetaTags(this.fullSeo),
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

<style scoped lang="scss">
.page-article {
}
</style>
