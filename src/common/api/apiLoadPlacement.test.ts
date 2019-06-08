import { FetchMock } from "jest-fetch-mock";
import apiLoadPlacement from "./apiLoadPlacement";

import testData from "../../utils/test-data";
import PlacementFactory from "../../model/PlacementFactory";
import GraphicLine from "../../model/graphic/GraphicLine";

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
    const placements = await apiLoadPlacement(projectId, pageId);
    expect(placements).toBeTruthy();
    expect(placements[0]).toBeInstanceOf(GraphicLine);
    const l1 = placements[0] as GraphicLine;

    expect(l1.id).toEqual(testData.lineA.id);
    expect(l1.p1).toEqual(testData.lineA.p1);
    expect(l1.p2).toEqual(testData.lineA.p2);
    expect(l1.color).toEqual(testData.lineA.color);
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
    expect(placements[0]).toBeInstanceOf(GraphicLine);
    expect(placements[1]).toBeInstanceOf(GraphicLine);
    const l1 = placements[0] as GraphicLine;
    const l2 = placements[1] as GraphicLine;
    expect(l1.p1).toEqual(testData.lineA.p1);
    expect(l2.p1).toEqual(testData.lineB.p1);
    expect(l2.p2).toEqual(testData.lineB.p2);
    expect(l2.color).toEqual(testData.lineB.color);
  });
});
