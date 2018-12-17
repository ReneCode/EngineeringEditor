import * as actions from "../../actions";
import IaBase from "./IaBase";
import IaPickItem from "./IaPickItem";

class IaDelete extends IaBase {
  start = async () => {
    try {
      let itemsToDelete = this.context.getState().graphic
        .selectedItems;
      if (itemsToDelete.length === 0) {
        const pickItem = new IaPickItem(this.context);
        const result = await pickItem.start(["delete"]);
        if (!result) {
          return;
        }
        itemsToDelete = result.items;
      }
      await this.context.dispatch(
        actions.removeGraphicItem(itemsToDelete),
      );
      await this.context.dispatch(
        actions.removeSelectedItem(itemsToDelete),
      );

      await this.context.dispatch(
        actions.deletePlacement(itemsToDelete),
      );

      return true; // restart
    } catch (ex) {
      console.log("Exception on IaDelete:", ex);
    }
  };
}

export default IaDelete;
