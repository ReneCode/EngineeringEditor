const post = async (cmd: object) => {
  let SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
  if (!SERVER) {
    SERVER = "http://localhost:8080";
  }
  const url = `${SERVER}/graphql`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cmd),
  });
  const j = await res.json();
  return j.data;
};

const graphql = async (query: string, variables: object | null) => {
  try {
    // remove new-line and compress spaces
    const q = query.replace(/\n/g, "").replace(/\s\s+/g, " ");

    const cmd = {
      query: q,
      variables: variables,
    };
    return await post(cmd);
  } catch (ex) {
    console.log(ex);
  }
};

export { graphql };
