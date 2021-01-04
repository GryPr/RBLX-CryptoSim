import { SciNum, SciNumToolKit } from "shared/scinum";
import * as Roact from "@rbxts/roact";
import { getOrderPrefix } from "../utils";
import Net from "@rbxts/net";
import { EphemeralClick } from "../scorePopUp";

const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass("PlayerGui");

interface counterState {
  saltTotal: SciNum;
  moneyTotal: SciNum;
}

export class Counter extends Roact.Component<{}, counterState> {
  private running: boolean = false;

  public constructor(props: {}) {
    super(props);
    this.setState({
      saltTotal: {
        Base: 0,
        Exponent: 1,
      },
      moneyTotal: {
        Base: 0,
        Exponent: 1,
      },
    });
  }

  public render(): Roact.Element {
    return (
      <screengui Key="Counter">
        <frame
          Key="SaltCounter"
          BackgroundTransparency={1}
          Position={new UDim2(0.02, 0, 0.9, 0)}
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
            Text={`${SciNumToolKit.removeDecimal(
              this.state.saltTotal.Base,
              1
            )}${getOrderPrefix(this.state.saltTotal.Exponent)}`}
          />

          <imagelabel
            Key="SaltCounterImage"
            BackgroundTransparency={1}
            Position={new UDim2(0, 0, 0.143, 0)}
            Size={new UDim2(0.25, 0, 0.25, 0)}
            SizeConstraint="RelativeXX"
            Image={"rbxassetid://6169181960"}
          />
        </frame>

        <frame
          Key="MoneyCounter"
          BackgroundTransparency={1}
          Position={new UDim2(0.02, 0, 0.8, 0)}
          Size={new UDim2(0.1, 20, 0.04, 20)}
        >
          <textlabel
            Key="MoneyCounterText"
            BackgroundTransparency={1}
            Position={new UDim2(0.3, 0, 0, 0)}
            Size={new UDim2(2, 0, 1, 0)}
            Font="Highway"
            TextScaled={true}
            TextXAlignment="Left"
            Text={`${this.state.moneyTotal.Base}${getOrderPrefix(
              this.state.moneyTotal.Exponent
            )}`}
          />

          <imagelabel
            Key="MoneyCounterImage"
            BackgroundTransparency={1}
            Position={new UDim2(0, 0, 0.143, 0)}
            Size={new UDim2(0.25, 0, 0.25, 0)}
            SizeConstraint="RelativeXX"
            Image={"rbxassetid://6159358790"}
          />
        </frame>
      </screengui>
    );
  }

  public didMount() {
    this.running = true;
    let initEvent = new Net.ClientEvent("Init");
    initEvent.SendToServer();

    // Retrieves the salt total from the server
    Net.WaitForClientEventAsync("returnSaltTotal").then((event) => {
      event.Connect((cb) => {
        if (SciNumToolKit.isSciNum(cb)) {
          this.setState((state) => {
            return {
              saltTotal: cb,
              moneyTotal: state.moneyTotal,
            };
          });
        } else {
          print(`Error receiving callback from server: ${cb}`);
        }
      });
    });

    // Retrieves the money total from the server
    Net.WaitForClientEventAsync("returnMoneyTotal").then((event) => {
      event.Connect((cb) => {
        if (SciNumToolKit.isSciNum(cb)) {
          this.setState((state) => {
            return {
              saltTotal: state.saltTotal,
              moneyTotal: cb,
            };
          });
        } else {
          print(`Error receiving callback from server: ${cb}`);
        }
      });
    });

    // Retrieves the salt total from the server
    Net.WaitForClientEventAsync("returnSaltAddend").then((event) => {
      event.Connect((cb) => {
        if (SciNumToolKit.isSciNum(cb)) {
          spawn(() => {
            let popUp = Roact.mount(
              <EphemeralClick addend={cb} />,
              PlayerGui,
              "EphemeralClick"
            );
            wait(2);
            Roact.unmount(popUp);
          });
        } else {
          print(`Error receiving callback from server: ${cb}`);
        }
      });
    });
  }
}
