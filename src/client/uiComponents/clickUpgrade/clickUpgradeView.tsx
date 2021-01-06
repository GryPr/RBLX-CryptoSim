import * as Roact from "@rbxts/roact";
import { InventoryView } from "../baseComponents/inventoryView";

export class ClickUpgradeView extends Roact.Component {
  public render(): Roact.Element {
    return (
      <InventoryView
        Key="ClickUpgradeView"
        index={2}
        name={"Crypto Upgrades"}
      ></InventoryView>
    );
  }
}
