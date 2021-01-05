import * as Roact from "@rbxts/roact";
import { InventoryView } from "../baseComponents/inventoryView";
import { testPetInventory } from "../../testValues/testPetInventory";
import { PetInventoryItem } from "./petInventoryItem";

export class PetInventoryView extends Roact.Component {
  public render(): Roact.Element {
    return (
      <InventoryView Key="PetInventoryView" index={1}>
        {testPetInventory.map((item, index) => {
          return (
            <PetInventoryItem
              Key={`${index + 1}`}
              petId={item.id}
            ></PetInventoryItem>
          );
        })}
      </InventoryView>
    );
  }
}
export {};
