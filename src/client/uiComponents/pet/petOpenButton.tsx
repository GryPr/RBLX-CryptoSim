import * as Roact from "@rbxts/roact";
import { GreyTextButton } from "../miscComponents/greyTextButton";
import { mainContext } from "../mainView";

export class PetInventoryOpenButton extends Roact.Component<
  { onClick: () => void },
  {}
> {
  public render(): Roact.Element {
    return (
      <mainContext.Consumer
        render={(value: {
          viewIndex: number;
          changeViewIndex: (index: number) => void;
        }) => {
          return (
            <GreyTextButton
              Key={"OpenPetInventory"}
              Size={new UDim2(0.1, 0, 0.1, 0)}
              Position={new UDim2(0.01, 0, 0.05, 0)}
              onClick={() => {
                this.props.onClick;
                value.changeViewIndex(1);
              }}
              Text={"Pet Inventory"}
            />
          );
        }}
      ></mainContext.Consumer>
    );
  }
}
