import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";
import { Pet } from "shared/items/types";
import { PetInventoryItem } from "./petInventoryItem";
import { PetInventoryOpenButton } from "./petOpenButton";
import { mainContext } from "../mainContext";

const Players = game.GetService("Players");
const player = Players.LocalPlayer;

interface petInventoryState {
  inventoryVisible: boolean;
}

interface petInventoryProps {
  petInventoryList: Array<Pet>;
}

export class PetInventory extends Roact.Component<
  petInventoryProps,
  petInventoryState
> {
  inventoryMotor: Flipper.SingleMotor;
  inventoryBinding: Roact.RoactBinding<number>;

  public constructor(props: petInventoryProps) {
    super(props);

    this.setState({
      inventoryVisible: false,
    });

    this.inventoryMotor = new Flipper.SingleMotor(0);
    const [binding, setBinding] = Roact.createBinding(
      this.inventoryMotor.getValue()
    );
    this.inventoryBinding = binding;
    this.inventoryMotor.onStep(setBinding);
  }

  toggle() {
    this.setState({
      inventoryVisible: !this.state.inventoryVisible,
    });
    if (this.state.inventoryVisible === true) {
      this.inventoryMotor.setGoal(
        new Flipper.Spring(0, {
          frequency: 1,
          dampingRatio: 0.5,
        })
      );
    } else {
      this.inventoryMotor.setGoal(
        new Flipper.Spring(1, {
          frequency: 2,
          dampingRatio: 0.8,
        })
      );
    }
  }

  public render(): Roact.Element {
    return (
      <mainContext.Consumer
        render={(value: {
          viewIndex: number;
          changeViewIndex: (index: number) => void;
        }) => {
          if (this.state.inventoryVisible === true && value.viewIndex !== 1) {
            this.toggle();
          } else if (
            this.state.inventoryVisible === false &&
            value.viewIndex === 1
          ) {
            this.toggle();
          }
          return (
            <screengui Key="PetUI">
              <frame
                Position={this.inventoryBinding.map((value) => {
                  return new UDim2(0.5, 0, -2, 0).Lerp(
                    new UDim2(0.5, 0, 0.5, 0),
                    value
                  );
                })}
                Size={new UDim2(0.5, 0, 0.8, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={0.1}
                BorderSizePixel={0}
                BackgroundColor3={new Color3(255, 255, 255)}
              >
                <uiaspectratioconstraint Key="aspectRatio" />
                <scrollingframe
                  Key={"Inventory"}
                  BackgroundTransparency={1}
                  AnchorPoint={new Vector2(0.5, 0.5)}
                  Position={new UDim2(0.5, 0, 0.5, 0)}
                  Size={new UDim2(0.95, 0, 0.95, 0)}
                  ScrollBarImageColor3={new Color3(0, 0, 0)}
                  BorderSizePixel={0}
                  ScrollBarImageTransparency={0.5}
                  VerticalScrollBarInset="ScrollBar"
                >
                  <uigridlayout
                    Key="gridLayout"
                    CellSize={new UDim2(0.2, 0, 0.2, 0)}
                    CellPadding={new UDim2(0.025, 0, 0.025, 0)}
                    HorizontalAlignment="Center"
                  >
                    <uiaspectratioconstraint Key="aspectRatio" />
                  </uigridlayout>
                  {this.props.petInventoryList.map((item, index) => {
                    return (
                      <PetInventoryItem
                        Key={`${index + 1}`}
                        onClick={() => this.toggle()}
                        petId={item.id}
                      ></PetInventoryItem>
                      // <textbutton Key={index} Text={item.Name}></textbutton>
                    );
                  })}
                </scrollingframe>
              </frame>
              <PetInventoryOpenButton onClick={() => this.toggle()} />
            </screengui>
          );
        }}
      ></mainContext.Consumer>
    );
  }
}
