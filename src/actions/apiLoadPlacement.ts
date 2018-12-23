import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";
import { IdType } from "../model/types";
import PlacementFactory from "../model/PlacementFactory";

export const apiLoadPlacement = async (
  projectId: IdType,
  pageId: IdType,
) => {
  const query: string = `query Q($projectId: ID!, $pageId: ID!) {
    placements(projectId:$projectId, pageId:$pageId) { id pageId projectId content type }
  }`;
  const variables = {
    projectId,
    pageId,
  };
  const result = await graphql(query, variables);
  const json = result.placements;
  const placements = <Placement[]>PlacementFactory.fromDTO(json);
  return placements;
};
