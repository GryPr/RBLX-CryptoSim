import * as Roact from "@rbxts/roact";
import { InventoryView } from "../baseComponents/inventoryView";

export class LimitUpgradeView extends Roact.Component {
  public render(): Roact.Element {
    return (
      <InventoryView
        Key="LimitUpgradeView"
        index={3}
        name={"Storage Upgrade"}
      ></InventoryView>
    );
  }
}
