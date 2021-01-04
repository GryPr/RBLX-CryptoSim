import * as Roact from "@rbxts/roact";
import { GreyTextButton } from "./miscComponents/greyTextButton";
import { mainContext } from "./mainView";

export class MainButtons extends Roact.Component {
  public render(): Roact.Element {
    return (
      <mainContext.Consumer
        render={(value: {
          viewIndex: number;
          changeViewIndex: (index: number) => void;
        }) => {
          return (
            <screengui>
              <GreyTextButton
                Key={"OpenPetInventory"}
                Size={new UDim2(0.1, 0, 0.1, 0)}
                Position={new UDim2(0.01, 0, 0.05, 0)}
                onClick={() => {
                  value.changeViewIndex(1);
                }}
                Text={"Pet Inventory"}
              />
              <GreyTextButton
                Key={"OpenClickUpgrades"}
                Size={new UDim2(0.1, 0, 0.1, 0)}
                Position={new UDim2(0.01, 0, 0.05, 0)}
                onClick={() => {
                  value.changeViewIndex(2);
                }}
                Text={""}
              />
              <GreyTextButton
                Key={"OpenLimitUpgrades"}
                Size={new UDim2(0.1, 0, 0.1, 0)}
                Position={new UDim2(0.01, 0, 0.05, 0)}
                onClick={() => {
                  value.changeViewIndex(3);
                }}
                Text={"Pet Inventory"}
              />
            </screengui>
          );
        }}
      ></mainContext.Consumer>
    );
  }
}
