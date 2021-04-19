export default function () {
  this.nuxt.hook("generate:done", (context) => {
    const routesToExclude = (process.env.ROUTES_TO_EXCLUDE || "")
      .split(",")
      .filter(Boolean);
    const allRoutes = Array.from(context.generatedRoutes);
    const routes = allRoutes.filter(
      (route) => !routesToExclude.includes(route)
    );
    this.nuxt.options.sitemap.routes = [...routes];
  });
}
