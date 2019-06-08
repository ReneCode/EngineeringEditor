import createId from "./createId";

test("createId", () => {
  const id = createId("P");

  expect(id.length).toEqual(37);
  expect(id[0]).toEqual("P");
});
