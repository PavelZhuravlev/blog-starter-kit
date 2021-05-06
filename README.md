
# Strapi Starter Nuxt Blog with Cloudinary

Nuxt starter for creating a Blog with Strapi and Cloudinary Media Platform.

This starter allows you to start Strapi with Nuxt and Cloudinary.
It is fully customizable and due to the fact that it is open source, fully open to contributions. So do not hesitate to add new features and report bugs!
![screenshot image](/demo.png)

## Features

- 2 Content types: Article, Category
- Global search through the Articles. Search fields: *title, description, content, category, author*
- Layout has minimum CSS, that save time when implementing unique design
- Component-based Layout
- Article social sharing, that implemented based on [vue-social-sharing](https://www.npmjs.com/package/vue-social-sharing) library
- Lazy-Loaded Articles(6 per step by default), that implemented based on [vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/)
- Empty States for categories and search
- Smart and Performant images are featured with Cloudinary Media Platform.
- Images Lazy-Loading, that implemented based on [lazysizes](https://github.com/aFarkas/lazysizes)
- Images support LQIP (low quality image placeholder) technique (Medium like)  based on [lazysizes Blur-up plugin](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/blur-up)
- Images support High-DPR screens and optimal sizes delivering based on art-direction and  [lazysizes RIAS plugin](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/rias)
- Images support custom Aspect Ratios.
- Cloudinary delivers images with most optimal format and quality(f_auto,q_auto) by default based on Cloudinary logic.
- Started Kit doesn't use SDKs like **cloudinary-vue** and **cloudinary-core**, because of their huge bundle size. Similar functionality was achieved using custom component + **lazy-sizes**
- **CldImage** component maintains images' aspect ratios server-side. So Started Kit is safe in terms of CLS (Cumulative Layout Shift) issues.
- Markdown links render with target="_blank" by default.
- Markdown headings downscaled by 1 (H1 - H2, H2-H3, H4-H5, H5-H6, H6-P) in terms of SEO (since each article has separated main title).
- Markdown images also support all images' features described above. This was achieved by mounting **CldImage** component into rendered markdown. (**EPIC**)
- Starter kit follows all Best Practices, Accessibility, SEO rules.
- **Rich SEO** that you can easily customize from your Strapi Admin.
- Dynamic Sitemap generation
- Robots generation
- GTM integration
- Small bundle size


## Components:

###  General components:
- AppButton
- AppInput
- AppSearchbox
- AppMarkdown
- AppAvatar
- AppHeader
- AppFooter
- AppNotFound
- CldImage

### Article-related components:
- ArticleCard
- ArticleSharing
- Articles

## Pages:

- "/" Home Page.
- "/article/:slug" Article Page.
- "/category/:slug" Filter By Category Page.
- "/search?q=" Search Page.

## Required Environment Variables

### For Nuxt Frontend:

* `GTM_ID` - Google Tag Manager ID (e.g. "GTM-XXXXXXX")
* `STRAPI_URL` - The Strapi backend server (e.g. "http://localhost:1337")
* `BASE_URL` - The Nuxt frontend server (e.g. "http://localhost:3000")
* `CLOUDINARY_CLOUD_NAME` - Cloudinary Cloud Name (e.g. "myawesomename")
* `ROUTES_TO_EXCLUDE` - Routes list (comma-separated) that should be excluded from SEO (Effects sitemap, robots and html indexing) (e.g. "/search,/privacy,/terms")

### For Strapi Backend:

* `HOST` - The Strapi backend host address (e.g. "0.0.0.0")
* `PORT` - The Strapi backend port (e.g. "1337")
* `BASE_URL` - The Nuxt frontend server (e.g. "http://localhost:3000")
* `CLOUDINARY_CLOUD_NAME` - Cloudinary Cloud Name. (e.g. "myawesomename")
* `CLOUDINARY_KEY` - Cloudinary API key
* `CLOUDINARY_SECRET` - Cloudinary API secret

**Cloudinary Properties** could be found in ["Cloudinary Dashboard"](https://cloudinary.com/console/) -> "Account Details" 


## Getting started

[Create free Cloudinary account](https://t.co/yOwv15C2N0?amp=1).

Use our `create-strapi-starter` CLI to create your project.

```sh
# Using Yarn
yarn create strapi-starter project-name-here PavelZhuravlev/nuxt-blog-kit

# Or using NPM
npx create-strapi-starter project-name-here PavelZhuravlev/nuxt-blog-kit
```

The CLI will create a monorepo, install dependencies, and run your project automatically.

## Post-install Setup

### For Strapi Backend:

1. In terminal shutdown current processes that are running in terminal using `control + c` and go to backend/ folder by running `cd backend/`
2. Rename `.env.example` -> `.env` and set correct values for variables
3. Create the following file `./config/plugins.js` and add the below lines of code to setup Cloudinary Upload Provider: 
```js
module.exports = ({ env }) => ({
	upload: {
		provider: 'cloudinary',
		providerOptions: {
			cloud_name: env('CLOUDINARY_NAME'),
			api_key: env('CLOUDINARY_KEY'),
			api_secret: env('CLOUDINARY_SECRET'),
		},
	},
});
```

4.Run `npm run import-seed-data` to load mock data for blog. After data is successfully loaded  start Strapi Backend.
```sh
npm run import-seed-data
npm run develop
```


### For Nuxt Frontend:
1. Rename `.env.example` -> `.env` and set correct values for variables
2. make sure you are in /frontend folder and run `npm run dev` to start Nuxt Frontend


### That is all.
 
The Nuxt frontend server will run here -> [http://localhost:3000](http://localhost:3000)   
The Strapi backend server will run here -> [http://localhost:1337](http://localhost:1337)

## Deploy Strapi Backend to Render

### Prerequisites:

1. Create [Render](https://render.com/) account and authorize your Github account in Render

2. Go to /backend folder:
```sh
cd backend/
```
3. Create the `config/env/production` folder with 3 files: `server.js`, `database.js` and `middleware.js`: 
```sh
mkdir -p config/env/production && touch $_/server.js $_/database.js $_/middleware.js
```
4.Add the following files to the production folder:

`server.js`
```js
module.exports = ({ env }) => ({
  host: "0.0.0.0",
  url: env("RENDER_EXTERNAL_URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
```
`database.js`
```js
const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host,
          port,
          database,
          username: user,
          password,
        },
      },
    },
  };
};
```
`middleware.js`
```js
module.exports = {
  settings: {
    logger: {
      level: "error",
    },
  },
};
```
5. Create `render.yaml` file in the backend/ folder.
```sh
touch render.yaml
```
`render.yaml`
```yaml
services:
  - type: web
    name: strapi
    env: node
    plan: starter
    buildCommand: yarn install && yarn build
    startCommand: yarn start
    healthCheckPath: /_health
    envVars:
      - key: NODE_VERSION
        value: 12.18.4
      - key: NODE_ENV
        value: production
      - key: CLOUDINARY_NAME
        sync: false
      - key: CLOUDINARY_KEY
        sync: false
      - key: CLOUDINARY_SECRET
        sync: false
      - key: DATABASE_URL
        fromDatabase:
          name: strapi
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: ADMIN_JWT_SECRET
        generateValue: true

databases:
  - name: strapi
    plan: starter
```
6. Init repository from `backend/` folder and push your backend. 
```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<GithubAccount>/<GithubRepositoryName>.git
git push -u origin main
```
7. Visit Github of this repository and click `Deploy to Render` button
8. **(Bonus)** Go to Render Dashboard navigate to **Services -> strapi 0 -> Shell** and run command below to load mock data:
```sh
npm run import-seed-data
```

## Deploy Nuxt Frontend to Netlify
1. Go to frontend/ folder 
```sh
cd frontend/
```
2. Init repository from `frontend/` folder and push your backend.
```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<GithubAccount>/<GithubRepositoryName>.git
git push -u origin main
```
3. Go to your [Netlify Dashboard](https://app.netlify.com/)
4. Press the **New site from Git** button on the Netlify dashboard. Authenticate with your repository host, select a repository to deploy, and continue. You should land on step 3: "Site settings, and deploy!"
5. Click **Show advanced** and setup environment variables that are listed in `Required Environment Variables` section of README.
6. Deploy!

## Webhooks

Our Nuxt Frontend uses full-static mode, because of this, content changes that you make under Strapi Admin will not be automatically reflected on your website.
You need to re-build your Nuxt application each time you make content change. To automate this process you should connect your Strapi Backend with Nuxt Frontend that is hosted on Netlify.

1. Go to your Netlify dashboard and navigate to **Sites -> Your Website -> Site settings -> Build & deploy**
2. Find **Build hooks** section and create new Build Hook by clicking **Add build hook**
3. Copy the url of created hook
4. Open your production Strapi Admin Dashboard and navigate to **Settings -> Webhooks**
5. Create new webhook by clicking **+ ADD NEW WEBHOOK**
![webhook-screenshot](/demo-webhook.png)
   
####Enjoy!