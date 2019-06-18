import React from "react";
import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

interface IProps {}

class IacExportSvg extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "exportSvg",
      this.onExportSvg,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onExportSvg = (items: Paper.Item[]) => {
    if (items.length === 0) {
      return;
    }
    const copyItems = items.map(i => {
      const item = i.clone();
      item.strokeCap = "round";
      return item;
    });

    const group = new Paper.Group();
    group.addChildren(copyItems);
    const bbox = group.bounds;
    const maxSize = Math.max(bbox.width, bbox.height);
    const maxSvgSize = 100;
    group.translate(new Paper.Point(0, 0).subtract(bbox.center));
    group.scale(maxSvgSize / maxSize);
    let svg: any = group.exportSVG({
      matchShapes: true,
      precision: 2,
      asString: true,
    });

    const output =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -52 104 104">' +
      svg +
      "</svg>";
    console.log(output);

    group.remove();
  };

  render() {
    return null;
  }
}

export default IacExportSvg;
