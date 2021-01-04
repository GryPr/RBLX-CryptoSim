import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";
import { playButtonSound } from "../utils";

interface greyTextButtonProps {
  onClick: () => void;
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
    onClick: () => {},
    Text: "GreyTextButton",
    Size: new UDim2(0, 100, 0, 100),
    Position: new UDim2(0, 0, 0, 0),
  };

  public render(): Roact.Element {
    return (
      <textbutton
        Event={{
          MouseButton1Down: () => {
            this.props.onClick();
            playButtonSound("421058925");
            this.motor.setGoal(
              new Flipper.Spring(0.4, {
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
        BackgroundTransparency={1}
        AnchorPoint={new Vector2(0.5, 0.5)}
        Size={this.props.Size}
        Position={this.props.Position}
        Text={""}
        TextScaled={true}
        TextWrapped={true}
        RichText={true}
        Font={"Code"}
      >
        <imagelabel
          Image={"rbxassetid://6182140353"}
          Size={this.binding.map((value) => {
            return new UDim2(1, 0, 1, 0).Lerp(new UDim2(0.9, 0, 0.9, 0), value);
          })}
          Position={new UDim2(0.5, 0, 0.5, 0)}
          AnchorPoint={new Vector2(0.5, 0.5)}
          BackgroundTransparency={1}
        ></imagelabel>
        <textlabel
          BackgroundTransparency={1}
          AnchorPoint={new Vector2(0.5, 0.5)}
          Size={new UDim2(0.9, 0, 0.6, 0)}
          Position={new UDim2(0.5, 0, 0.45, 0)}
          Text={this.props.Text}
          TextScaled={true}
          TextWrapped={true}
          RichText={true}
          Font={"Code"}
        ></textlabel>
      </textbutton>
    );
  }
}
