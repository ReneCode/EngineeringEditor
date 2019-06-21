import AutoConnectionUtil from "./AutoConnectionUtil";
import Placement from "../Placement";
import GraphicLine from "../graphic/GraphicLine";

const updateAutoConnection = (items: Placement[]) => {
  const ac = new AutoConnectionUtil(items);
  const pairs = ac.getConnectionPairs();

  pairs.map(p => {
    const line = new GraphicLine(p.source.pt, p.dest.pt);
    line.color = "red";
    line.layer = "autoconnect";
    line.paperDraw();
    return line;
  });
};

export default updateAutoConnection;
