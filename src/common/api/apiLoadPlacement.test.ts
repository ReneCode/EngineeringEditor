import { FetchMock } from "jest-fetch-mock";
import apiLoadPlacement from "./apiLoadPlacement";

import testData from "../../utils/test-data";
import PlacementFactory from "../../model/PlacementFactory";

describe("apiLoadPlacement", () => {
  const fetchMock = fetch as FetchMock;
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("one line", async () => {
    const dto = PlacementFactory.toDTO(testData.lineA);
    fetchMock.mockResponse(
      JSON.stringify({
        data: { placements: [dto] },
      }),
    );

    const projectId = "prjId";
    const pageId = "pageId";
    const placement = await apiLoadPlacement(projectId, pageId);
    expect(placement).toBeTruthy();
    expect(placement[0]).toEqual(testData.lineA);
  });

  it("two lines", async () => {
    const dtos = PlacementFactory.toDTO([
      testData.lineA,
      testData.lineB,
    ]);
    fetchMock.mockResponse(
      JSON.stringify({
        data: { placements: dtos },
      }),
    );

    const projectId = "prjId";
    const pageId = "pageId";
    const placements = await apiLoadPlacement(projectId, pageId);
    expect(placements).toBeTruthy();
    expect(placements).toHaveLength(2);
    expect(placements[0]).toEqual(testData.lineA);
    expect(placements[1]).toEqual(testData.lineB);
  });
});
