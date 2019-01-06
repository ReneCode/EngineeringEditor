import Page from "../../model/Page";
import graphql from "./graphql";

const apiUpdatePage = async (
  page: Page,
  property: string,
  value: string,
) => {
  const query = `mutation updatePage($input: UpdatePageInput!) {
    updatePage(input: $input)
  }`;
  const variables = {
    input: {
      projectId: page.projectId,
      id: page.id,
      property,
      value,
    },
  };

  const result = await graphql(query, variables);
};

export default apiUpdatePage;
