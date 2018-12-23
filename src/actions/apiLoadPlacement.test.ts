import { FetchMock } from "jest-fetch-mock";
import { apiLoadPlacement } from "./apiLoadPlacement";

import testData from "../utils/test-data";

describe("apiLoadPlacement", () => {
  const fetchMock = fetch as FetchMock;
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const lineA = testData.lineA;

  it("start", async () => {
    const dto = lineA.toDTO();
    fetchMock.mockResponse(
      JSON.stringify({
        data: { placements: [dto] },
      }),
    );

    const projectId = "prjId";
    const pageId = "pageId";
    const placement = await apiLoadPlacement(projectId, pageId);
    expect(placement).toBeTruthy();
    expect(placement[0]).toEqual(lineA);
  });
});
