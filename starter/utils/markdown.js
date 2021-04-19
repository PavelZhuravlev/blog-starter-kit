import { getFilesByUrlQuery } from "~/queries/files";
import { calcCssRatio } from "./medias";

function cssRatioReducer(acc, { width, height, url }) {
  return { [url]: calcCssRatio(width, height), ...acc };
}

function attrReducer(cssRatiosByUrl, acc, [key, value]) {
  const doSkip = key !== "src" || !value;
  if (!doSkip) {
    const dataAttr = ["data-img", Buffer.from(value).toString("base64")];
    const styleAttr = ["style", `padding-top: ${cssRatiosByUrl[value]}`];
    const cssAttr = ["class", `cld-img-holder`];
    acc.push(dataAttr, styleAttr, cssAttr);
  }
  return acc;
}

const headingTagsMapping = {
  h1: "h2",
  h2: "h3",
  h3: "h4",
  h4: "h5",
  h5: "h6",
  h6: "p",
};

export function renderMarkdown($md, markdown, images) {
  const cssRatios = images.reduce(cssRatioReducer, {});
  $md.renderer.rules.image = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    token.attrs = token.attrs.reduce(attrReducer.bind(null, cssRatios), []);
    return `<div ${slf.renderAttrs(token)}></div>`;
  };
  $md.renderer.rules.link_open = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    token.attrs.push(["target", "_blank"]);
    return `<a ${slf.renderAttrs(token)}>`;
  };
  const headingRule = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    token.tag = headingTagsMapping[token.tag] || "p";
    return slf.renderToken(tokens, idx, options);
  };
  $md.renderer.rules.heading_open = headingRule;
  $md.renderer.rules.heading_close = headingRule;
  return $md.render(markdown);
}

export async function loadMarkdownImages($strapi, markdown) {
  const regex = new RegExp(/!\[[^\]]*\]\((.*?)(?=\"|\))(\".*\")?\)/g);
  const [...matches] = markdown.matchAll(regex);
  const urls = matches.map(([, url]) => url).filter(Boolean);
  if (urls.length) {
    const query = getFilesByUrlQuery(urls);
    const { files: images } = await $strapi.graphql(query);
    return images;
  } else {
    return [];
  }
}
