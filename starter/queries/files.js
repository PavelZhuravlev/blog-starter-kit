export const getFilesByUrlQuery = (urls) => {
  const _orStr = urls.map((url) => `{ url: "${url}" }`).join(",");
  return {
    query: `{
      files(where: {_or: [${_orStr}]}) {
        url
        provider_metadata
        width
        height
      }
    }`,
  };
};
