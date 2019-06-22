import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { createSymbolAction } from "../../actions/createSymbol";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import PaperUtil from "../../utils/PaperUtil";
import store from "../../store/index";

const getInsertPoint = (placements: Placement[]): Paper.Point => {
  const items = placements.map(p => p.getPaperItem());
  const bbox = PaperUtil.createBoundingBox(items);
  return bbox.center.clone();
};

const onCreateSymbolAndSymbolRef = (placementIds: string[]) => {
  if (!placementIds || placementIds.length === 0) {
    return;
  }
  const placements = PaperUtil.getPlacementsById(placementIds);

  const point = getInsertPoint(placements);
  const symbolName = `Symbol-${store.getState().graphic.symbols
    .length + 1}`;
  const projectId = placements[0].projectId;
  const symbol = new GraphicSymbol(placements, point);
  symbol.name = symbolName;
  symbol.projectId = projectId;

  store.dispatch(createSymbolAction(symbol));

  const symbolRef = new GraphicSymbolRef(symbolName, point);
  store.dispatch(
    cudElementAction("placement", symbolRef, undefined, placements),
  );
};

// self register
const register = () => {
  appEventDispatcher.subscribe(
    "createSymbolAndSymbolRef",
    onCreateSymbolAndSymbolRef,
  );
};
register();
