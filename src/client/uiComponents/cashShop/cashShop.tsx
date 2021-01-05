import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";
import { playButtonSound } from "../utils";

interface shopState {
  shopVisible: boolean;
}

class Shop extends Roact.Component<{}, shopState> {
  motor: Flipper.SingleMotor;
  binding: Roact.RoactBinding<number>;

  cashShopMotor: Flipper.SingleMotor;
  cashShopBinding: Roact.RoactBinding<number>;

  public constructor(props: {}) {
    super(props);

    this.setState({
      shopVisible: false,
    });

    // Cash Shop Button Flipper Bindings
    this.motor = new Flipper.SingleMotor(0);
    const [binding, setBinding] = Roact.createBinding(this.motor.getValue());
    this.binding = binding;
    this.motor.onStep(setBinding);

    // Cash Shop Flipper Bindings
    this.cashShopMotor = new Flipper.SingleMotor(0);
    const [cashShopBinding, setCashShopBinding] = Roact.createBinding(
      this.cashShopMotor.getValue()
    );
    this.cashShopBinding = cashShopBinding;
    this.cashShopMotor.onStep(setCashShopBinding);
  }

  public render(): Roact.Element {
    return (
      <screengui Key="Shop">
        <textbutton
          Key="CashShopButton"
          Position={new UDim2(0.07, 0, 0.3, 0)}
          Font={"Highway"}
          Text={"💰 CASH SHOP 💰"}
          TextScaled={true}
          Style={"RobloxRoundDropdownButton"}
          //Image="rbxassetid://6159337597"
          Size={this.binding.map((value) => {
            return new UDim2(0.1, 20, 0.05, 20).Lerp(
              new UDim2(0.08, 20, 0.04, 20),
              value
            );
          })}
          SizeConstraint={"RelativeXY"}
          BackgroundTransparency={1}
          AnchorPoint={new Vector2(0.5, 0.5)}
          //ImageColor3={new Color3(240,240,240)}
          Event={{
            MouseButton1Down: () => {
              this.motor.setGoal(
                new Flipper.Spring(0.25, {
                  frequency: 15,
                  dampingRatio: 1,
                })
              );
              playButtonSound("rbxassetid://6042053626");
            },
            MouseButton1Up: () => {
              this.motor.setGoal(
                new Flipper.Spring(-0.5, {
                  frequency: 25,
                  dampingRatio: 0.75,
                })
              );

              if (this.state.shopVisible === true) {
                this.setState({
                  shopVisible: false,
                });
                this.cashShopMotor.setGoal(
                  new Flipper.Spring(0, {
                    frequency: 5,
                    dampingRatio: 1,
                  })
                );
              } else {
                this.setState({
                  shopVisible: true,
                });
                this.cashShopMotor.setGoal(
                  new Flipper.Spring(1, {
                    frequency: 5,
                    dampingRatio: 1,
                  })
                );
              }
            },
            MouseEnter: () => {
              this.motor.setGoal(
                new Flipper.Spring(-0.5, {
                  frequency: 15,
                  dampingRatio: 1,
                })
              );
            },
            MouseLeave: () => {
              this.motor.setGoal(
                new Flipper.Spring(0, {
                  frequency: 25,
                  dampingRatio: 0.75,
                })
              );
            },
          }}
        ></textbutton>
        <frame
          Key="CashShop"
          Position={this.cashShopBinding.map((value) => {
            return new UDim2(0.5, 0, -2, 0).Lerp(
              new UDim2(0.5, 0, 0.5, 0),
              value
            );
          })}
          BackgroundColor3={new Color3(255, 255, 255)}
          BorderSizePixel={0}
          Size={new UDim2(0.5, 0, 0.8, 0)}
          //Visible={this.state.shopVisible}
          //SizeConstraint={"RelativeXY"}
          AnchorPoint={new Vector2(0.5, 0.5)}
        >
          <imagebutton
            Image={"rbxassetid://6159628368"}
            BackgroundTransparency={1}
            Position={new UDim2(0.1, 0, 0.1, 0)}
            Size={new UDim2(0.2, 0, 0.2, 0)}
            SizeConstraint="RelativeYY"
          >
            <textlabel
              AnchorPoint={new Vector2(0.5, 0.5)}
              BackgroundTransparency={1}
              Position={new UDim2(0.5, 0, 1, 0)}
              Size={new UDim2(1, 0, 0.5, 0)}
              Font="PatrickHand"
              Text="$10,000"
              TextScaled={true}
            />
            <uigridlayout
              CellPadding={new UDim2(0, 10, 0, 10)}
              CellSize={new UDim2(0, 100, 0, 100)}
              HorizontalAlignment="Center"
              SortOrder="Name"
              VerticalAlignment="Top"
            />
          </imagebutton>
          <imagebutton />
          <imagebutton />
          <imagebutton />
        </frame>
      </screengui>
    );
  }
}
