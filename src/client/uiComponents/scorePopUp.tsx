import { SciNum, SciNumToolKit } from "shared/scinum";
import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper";
import { getOrderPrefix } from "./utils";

interface ephemeralClickProps {
  addend: SciNum;
}

interface ephemeralClickState {
  transparency: number;
}

export class EphemeralClick extends Roact.Component<
  ephemeralClickProps,
  ephemeralClickState
> {
  motor: Flipper.SingleMotor;
  binding: Roact.RoactBinding<number>;
  position: UDim2;

  public constructor(props: ephemeralClickProps) {
    super(props);

    this.motor = new Flipper.SingleMotor(0);
    const [binding, setBinding] = Roact.createBinding(this.motor.getValue());
    this.binding = binding;
    this.motor.onStep(setBinding);

    this.position = this.randomPosition();

    this.setState({
      transparency: 0.1,
    });
  }

  randomPosition(): UDim2 {
    let x: number = math.random(2, 8);
    x = x / 10;
    let y: number = math.random(2, 8);
    y = y / 10;
    return new UDim2(new UDim(x), new UDim(y));
  }

  public render(): Roact.Element {
    return (
      <screengui Key="EphemeralClick">
        <frame
          Key="SaltCounter"
          BackgroundTransparency={1}
          Position={this.binding.map((value) => {
            return this.position.Lerp(
              new UDim2(this.position.X, new UDim(1.2)),
              value
            );
          })}
          Size={new UDim2(0.1, 20, 0.04, 20)}
        >
          <textlabel
            Key="SaltCounterText"
            BackgroundTransparency={1}
            Position={new UDim2(0.3, 0, 0, 0)}
            Size={new UDim2(2, 0, 1, 0)}
            Font="Highway"
            TextScaled={true}
            TextXAlignment="Left"
            TextTransparency={this.state.transparency}
            Text={`${SciNumToolKit.removeDecimal(
              this.props.addend.Base,
              1
            )}${getOrderPrefix(this.props.addend.Exponent)}`}
          />

          <imagelabel
            Key="SaltCounterImage"
            BackgroundTransparency={1}
            Position={new UDim2(0, 0, 0.143, 0)}
            Size={new UDim2(0.25, 0, 0.25, 0)}
            SizeConstraint="RelativeXX"
            ImageTransparency={this.state.transparency}
            Image={"rbxassetid://6169181960"}
          />
        </frame>
      </screengui>
    );
  }

  public didMount() {
    this.motor.setGoal(
      new Flipper.Spring(-1, {
        frequency: 1,
        dampingRatio: 1,
      })
    );
    spawn(() => {
      while (this.state.transparency < 1) {
        wait(0.1);
        this.setState((state) => {
          return {
            transparency: state.transparency + 0.1,
          };
        });
      }
    });
  }
}
