import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";
import { mainContext } from "../mainContext";

interface inventoryState {
  inventoryVisible: boolean;
}

interface inventoryProps {
  index: number;
}

export class InventoryView extends Roact.Component<
  inventoryProps,
  inventoryState
> {
  inventoryMotor: Flipper.SingleMotor;
  inventoryBinding: Roact.RoactBinding<number>;

  public constructor(props: inventoryProps) {
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
          if (
            this.state.inventoryVisible === true &&
            value.viewIndex !== this.props.index
          ) {
            print(`Closing index ${this.props.index}`);
            this.toggle();
          } else if (
            this.state.inventoryVisible === false &&
            value.viewIndex === this.props.index
          ) {
            print(`Opening index ${this.props.index}`);
            this.toggle();
          }
          return (
            <screengui>
              <frame
                Position={this.inventoryBinding.map((value) => {
                  return new UDim2(0.5, 0, -2, 0).Lerp(
                    new UDim2(0.5, 0, 0.5, 0),
                    value
                  );
                })}
                Size={new UDim2(0.5, 0, 0.8, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                BorderSizePixel={0}
                BackgroundColor3={new Color3(255, 255, 255)}
              >
                <imagelabel
                  Key={"Background"}
                  Size={new UDim2(1, 0, 1, 0)}
                  BackgroundTransparency={1}
                  ImageTransparency={0.3}
                  ZIndex={0}
                  Image={"rbxassetid://6196969584"}
                ></imagelabel>
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
                  {this.props[Roact.Children]}
                </scrollingframe>
              </frame>
            </screengui>
          );
        }}
      ></mainContext.Consumer>
    );
  }
}
