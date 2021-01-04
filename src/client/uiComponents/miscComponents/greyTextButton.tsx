import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";

interface greyTextButtonProps {
  onClick?: () => void;
  Text?: string;
  Size?: UDim2;
  Position?: UDim2;
}

export class GreyTextButton extends Roact.Component<greyTextButtonProps> {
  motor: Flipper.SingleMotor;
  binding: Roact.RoactBinding<number>;

  public constructor(props: any) {
    super(props);

    this.motor = new Flipper.SingleMotor(0);
    const [binding, setBinding] = Roact.createBinding(this.motor.getValue());
    this.binding = binding;
    this.motor.onStep(setBinding);
  }

  static defaultProps: greyTextButtonProps = {
    Text: "GreyTextButton",
    Size: new UDim2(0, 100, 0, 100),
    Position: new UDim2(0, 0, 0, 0),
  };

  public render(): Roact.Element {
    return (
      <imagebutton
        Event={{
          MouseButton1Down: () => {
            this.props.onClick;
            this.motor.setGoal(
              new Flipper.Spring(-0.4, {
                frequency: 10,
                dampingRatio: 1,
              })
            );
          },
          MouseButton1Up: () => {
            this.motor.setGoal(
              new Flipper.Spring(0, {
                frequency: 5,
                dampingRatio: 1,
              })
            );
          },
        }}
        Image={"rbxassetid://6182140353"}
        BackgroundTransparency={1}
        AnchorPoint={new Vector2(0.5, 0.5)}
        Size={this.binding.map((value) => {
          return this.props.Size?.Lerp(
            new UDim2(
              this.props.Size?.X.add(new UDim(this.props.Size?.X.Scale / 10)),
              this.props.Size?.Y.add(new UDim(this.props.Size?.Y.Scale / 10))
            ),
            value
          )!;
        })}
        Position={this.props.Position}
      >
        <uiaspectratioconstraint
          AspectRatio={3}
          DominantAxis={"Height"}
          AspectType={"ScaleWithParentSize"}
        />
        <textlabel
          Text={this.props.Text}
          Size={new UDim2(0.9, 0, 0.7, 0)}
          Position={new UDim2(0.5, 0, 0.5, 0)}
          AnchorPoint={new Vector2(0.5, 0.5)}
          BackgroundTransparency={1}
          TextScaled={true}
          TextWrapped={true}
          RichText={true}
          Font={"Code"}
        ></textlabel>
      </imagebutton>
    );
  }
}
