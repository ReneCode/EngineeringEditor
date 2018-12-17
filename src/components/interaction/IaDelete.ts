import * as actions from "../../actions";
import IaBase from "./IaBase";
import IaPickItem from "./IaPickItem";

class IaDelete extends IaBase {
  start = async () => {
    try {
      let itemsToDelete = this.props.getState().graphic.selectedItems;
      if (itemsToDelete.length === 0) {
        const pickItem = new IaPickItem(this.props);
        const result = await pickItem.start(["delete"]);
        if (!result) {
          return;
        }
        itemsToDelete = result.items;
      }
      await this.props.dispatch(
        actions.removeGraphicItem(itemsToDelete),
      );
      await this.props.dispatch(
        actions.removeSelectedItem(itemsToDelete),
      );

      await this.props.dispatch(
        actions.deletePlacement(itemsToDelete),
      );

      return true; // restart
    } catch (ex) {
      console.log("Exception on IaDelete:", ex);
    }
  };
}

export default IaDelete;
