import createId from "./createId";

test("createId", () => {
  const id = createId("P");
  console.log(id);

  expect(id.length).toEqual(37);
  expect(id[0]).toEqual("P");
});
