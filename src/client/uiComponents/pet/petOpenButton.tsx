import * as Roact from "@rbxts/roact";
import { GreyTextButton } from "../baseComponents/greyTextButton";
import { mainContext } from "../mainContext";

export class PetInventoryOpenButton extends Roact.Component<
  { onClick: () => void },
  {}
> {
  public render(): Roact.Element {
    return (
      <GreyTextButton
        Key={"OpenPetInventory"}
        Size={new UDim2(0.1, 0, 0.1, 0)}
        Position={new UDim2(0.01, 0, 0.05, 0)}
        onClick={() => {
          this.props.onClick;
        }}
        Text={"Pet Inventory"}
      />
    );
  }
}
