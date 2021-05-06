import stringify from "qs/lib/stringify";

export default ({ $strapi }, inject) => {
  const articlesNumberPerStep = 6;
  inject("loadArticles", (extraParams = {}, lazyLoadStepCounter = 0) => {
    return $strapi.find(
      "articles",
      stringify({
        status: "published",
        _sort: "publishedAt:desc",
        _start: lazyLoadStepCounter * articlesNumberPerStep,
        _limit: articlesNumberPerStep,
        ...extraParams,
      })
    );
  });
};
