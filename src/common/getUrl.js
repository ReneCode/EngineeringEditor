function getUrl(name, ...args) {
  const SERVER = "http://localhost:3001";
  const urls = {
    root: SERVER,
    projects: `${SERVER}/projects`,
    pages: `${SERVER}/pages`,
    graphics: `${SERVER}/graphics`,
  };

  let url = urls[name];
  if (!url) {
    throw new Error(`Url: ${name} not found`);
  }

  const count = args.length;
  let i = 0;
  for (i = 0; i < count; i++) {
    const arg = args[i];
    const replace = "{" + (i + 1) + "}";
    const foundIdx = url.indexOf(replace);
    if (foundIdx < 0) {
      throw new Error(`too many parameters: ${arg}`);
    }
    url = url.replace(replace, arg);
  }

  const replace = "{" + (i + 1) + "}";
  const foundIdx = url.indexOf(replace);
  if (foundIdx >= 0) {
    throw new Error(`url parameter: ${replace} not set`);
  }

  return url;
}

export default getUrl;
