import undoRedoReducer from "../reducers/undoRedoReducer";
import {
  undoRedoAddStartMarkerCommit,
  undoRedoAddCommit,
} from "./undo";

describe("undoredo", () => {
  it("add", () => {
    let s1 = undoRedoReducer();
    expect(s1.canRedo).toEqual(false);
    expect(s1.canUndo).toEqual(false);

    let s2 = undoRedoReducer(s1, undoRedoAddStartMarkerCommit());
    expect(s2.canRedo).toEqual(false);
    expect(s2.canUndo).toEqual(true);
    expect(s2.urList).toHaveLength(1);

    let s3 = undoRedoReducer(
      s2,
      undoRedoAddCommit("placement", "old", "new"),
    );
    expect(s3.canRedo).toEqual(false);
    expect(s3.canUndo).toEqual(true);
    expect(s3.urList).toHaveLength(2);
  });
});
