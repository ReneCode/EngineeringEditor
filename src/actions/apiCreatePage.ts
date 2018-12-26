import Placement from "../model/Placement";
import { DtoPlacement } from "../model/dtoUtil";
import { graphql } from "../common/graphql-api";
import PlacementFactory from "../model/PlacementFactory";
import Page from "../model/Page";

// -> Page
const apiCreatePage = async (page: Page): Promise<Page> => {
  try {
    const mutation: string = `
      mutation createPage($input: CreatePageInput!) {
        createPage(input: $input) {
          id name
        }
      }
      `;
    const variables = {
      input: {
        name: page.name,
        projectId: page.projectId,
      },
    };
    const result = await graphql(mutation, variables);
    const resultPage = result.createPage;

    const newPage = new Page(resultPage.name);
    newPage.id = resultPage.id;
    newPage.projectId = page.projectId;

    return newPage;
  } catch (err) {
    throw new Error(err);
  }
};

export default apiCreatePage;
