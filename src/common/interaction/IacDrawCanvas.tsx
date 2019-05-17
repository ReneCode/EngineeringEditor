import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import { ItemMetaData } from "../../common/ItemMetaData";
import Placement from "../../model/Placement";
import PaperPlacement from "../../model/graphic/PaperPlacement";
import { IGlobalState } from "../../reducers";

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

interface IProps {
  items: Placement[];
}

class IacDrawCanvas extends React.Component<IProps> {
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.items !== this.props.items) {
      // console.log(":drawCanvas", this.props.items);
      console.log("draw canvas", this.props.items.length);
      this.drawCanvas(Paper.project, this.props.items);
    }
  }

  drawCanvas = (project: Paper.Project, items: Placement[]) => {
    project.activeLayer.removeChildren();
    items.forEach(placement => {
      placement.paperDraw();
      // const paperItem = this.createPaperItem(placement);
      // if (paperItem && placement instanceof PaperPlacement) {
      //   // project.activeLayer.addChild(paperItem);
      // }
    });
  };

  createPaperItem = (placement: Placement): Paper.Item | null => {
    let paperItem: Paper.Item | null = null;
    const fixedPaperItem = placement.getPaperItem();
    if (fixedPaperItem) {
      // these paperItem will be modified
      paperItem = fixedPaperItem.clone();
    } else {
      paperItem = placement.paperDraw();
    }
    if (!paperItem) {
      return null;
      // throw new Error("paperDraw return no item:" + placement);
    }
    if (!paperItem.data) {
      const metaData: ItemMetaData = {
        placement: placement,
        rev: 1,
      };
      paperItem.data = metaData;
    }
    return paperItem;
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(IacDrawCanvas);
