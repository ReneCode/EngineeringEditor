import Page from "../../model/Page";
import graphql from "./graphql";

const apiUpdatePage = async (page: Page) => {
  const query = `mutation updatePage($input: UpdatePageInput!) {
    updatePage(input: $input)
  }`;
  const variables = {
    input: {
      projectId: page.projectId,
      id: page.id,
      name: page.name,
    },
  };

  await graphql(query, variables);
};

export default apiUpdatePage;
