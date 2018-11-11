const post = async (cmd: object) => {
  let SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
  const url = `${SERVER}/graphql`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!res) {
    throw new Error("graphQL no result");
  }
  const j = await res.json();
  if (j.error) {
    throw new Error("graphQL Error:" + j.error.toString());
  }
  return j.data;
};

const graphql = async (
  query: string,
  variables: object | null = null,
) => {
  // remove new-line and compress spaces
  const q = query.replace(/\n/g, "").replace(/\s\s+/g, " ");

  const cmd = {
    query: q,
    variables: variables,
  };
  return await post(cmd);
};

export { graphql };
