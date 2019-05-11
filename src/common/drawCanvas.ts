import Paper from "paper";
import Placement from "../model/Placement";
import { ItemMetaData } from "./ItemMetaData";
import PaperPlacement from "../model/graphic/PaperPlacement";

/*

  Umstellung auf PaperPlacement

  PaperPlacement enthält selbst ein Paper.Item, das aber nur die Daten hält (ohne darstellung)
  in dieses _paperItem wird importiert (beim laden der placements)

  beim Darstellen der Seite wird ein Paper.Item benötigt, dass später dynamisch verändert wird
  (z.B. bei dynamischen Verschieben). Daher darf *nicht* das orginal _paperItem bei .paperDraw()
  geliefert werden - sondern eine copy (mittels _paperItem.clone())

  improvements:
  schöner ist es, ein placement.getPaperItem() zu haben und hier beim übertragen auf den aktiven Layer 
  eine copy mittels .clone() zu erzeugen.

*/
const drawCanvas = (project: Paper.Project, items: Placement[]) => {
  project.activeLayer.removeChildren();
  items.forEach(placement => {
    const paperItem = createPaperItem(placement);
    if (paperItem && placement instanceof PaperPlacement) {
      project.activeLayer.addChild(paperItem);
    }
  });
};

export const createPaperItem = (
  placement: Placement,
): Paper.Item | null => {
  let paperItem = undefined;

  if (placement.getPaperItem) {
    paperItem = placement.getPaperItem(); // .clone();
  } else {
    paperItem = placement.paperDraw();
  }
  if (!paperItem) {
    debugger;
    return null;
    // throw new Error("paperDraw return no item:" + placement);
  }
  const metaData: ItemMetaData = {
    placement: placement,
    rev: 1,
  };
  paperItem.data = metaData;
  return paperItem;
};

export default drawCanvas;
