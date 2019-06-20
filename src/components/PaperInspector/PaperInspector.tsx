import React from "react";
import Paper from "paper";
import PaperUtil from "../../utils/PaperUtil";
import Placement from "../../model/Placement";
import GraphicLine from "../../model/graphic/GraphicLine";
import GraphicArc from "../../model/graphic/GraphicArc";
import GraphicText from "../../model/graphic/GraphicText";

interface IProps {}

class PaperInspector extends React.Component<IProps> {
  state: {
    project: Paper.Project | null;
    redraw: number;
    autoUpdate: boolean;
  } = { project: null, redraw: 0, autoUpdate: false };

  componentDidMount() {
    const orginalChangeFn = (Paper.project as any)._changed;
    const self = this;
    (Paper.project as any)._changed = function(
      flags: any,
      item: any,
    ) {
      orginalChangeFn.apply(this, arguments);

      if (self.state.autoUpdate) {
        self.setState({
          redraw: self.state.redraw + 1,
        });
      }
    };
  }

  onClick = (event: any) => {
    const target = event.target;
    const autoUpdate = target.checked;
    if (!autoUpdate) {
      this.setState({
        autoUpdate: autoUpdate,
        project: null,
      });
      return;
    } else {
      this.setState({
        autoUpdate: autoUpdate,
        project: Paper.project,
      });
    }
  };

  getPlacementData(placement: Placement): string {
    if (!placement) {
      return "-no-placement-";
    }
    let result: any[] = [`${placement.type}`];
    switch (placement.type) {
      case "line": {
        const line = placement as GraphicLine;
        return `${line.type} ${line.p1.x} ${line.p1.y} ${line.p2.x} ${
          line.p2.y
        }`;
      }

      case "arc": {
        const arc = placement as GraphicArc;
        return `${arc.type} ${arc.center.x} ${arc.center.y} ${
          arc.radius
        }`;
      }

      case "text": {
        const text = placement as GraphicText;
        return `${text.type} ${text.pt.x} ${text.pt.y} ${text.text}`;
      }

      default:
        return `${placement.type}`;
    }
  }

  getColor(color: any) {
    if (!color) {
      return "-no-color-";
    }
    if (typeof color === "string") {
      return color;
    }
    return (color as Paper.Color).toCSS(true);
  }

  getItemData(item: Paper.Item): string {
    const id = item.data;
    const [placement] = PaperUtil.getPlacementsById([id]);
    if (placement) {
      return `${item.name} ${this.getColor(
        item.strokeColor,
      )} ${this.getPlacementData(placement)}`;
    } else {
      switch (item.name) {
        default:
          return `${item.name} ${item.position.x} ${
            item.position.y
          } ${item.className}`;
      }
    }
  }

  render() {
    return (
      <div className="paper-inspector">
        <div className="paper-inspector--list">
          {this.state.project &&
            this.state.project.activeLayer.children.map(
              (item, index) => {
                const data = this.getItemData(item);
                return <div key={index}>{data}</div>;
              },
            )}
        </div>
        <input
          className="paper-inspector--autoupdate"
          id="autoupdate"
          type="checkbox"
          onClick={this.onClick}
        />
        <label htmlFor="autoupdate">paper inspector</label>
      </div>
    );
  }
}

export default PaperInspector;
