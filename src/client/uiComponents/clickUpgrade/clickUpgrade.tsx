import * as Roact from "@rbxts/roact";
import { Pet } from "shared/items/types";
import { InventoryView } from "../baseComponents/inventoryView";
import { testPetInventory } from "../../testValues/testPetInventory";

export class ClickUpgradeView extends Roact.Component {
  public render(): Roact.Element {
    return (
      <InventoryView<Pet>
        inventoryList={testPetInventory}
        Key="ClickUpgradeView"
      >
        <textbutton Text="Test"></textbutton>
      </InventoryView>
    );
  }
}
export {};
