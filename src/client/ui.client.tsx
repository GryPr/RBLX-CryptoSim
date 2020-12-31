import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper"
import { SoundService } from "@rbxts/services";
import Net from "@rbxts/net";

const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
    "PlayerGui",
);

interface shopState {
    shopVisible: boolean;
}

class Shop extends Roact.Component<
    {},
    shopState
> {

    motor:Flipper.SingleMotor
    binding:Roact.RoactBinding<number>

    public constructor(props:{}) {
        super(props);
        this.motor = new Flipper.SingleMotor(0);
        const [binding, setBinding] = Roact.createBinding(this.motor.getValue());
        this.binding = binding;
        this.motor.onStep(setBinding)
        this.setState({
            shopVisible: false,
        })
    }

    public render(): Roact.Element {
        return (
        <screengui>
            <textbutton 
                Key="CashShopButton"
                Position={new UDim2(0.06, 0, 0.3, 0)}
                Font={"Highway"}
                Text={"💰 CASH SHOP 💰"}
                TextScaled={true}
                Style={"RobloxRoundDropdownButton"}
                //Image="rbxassetid://6159337597"
                Size={this.binding.map((value) => {return new UDim2(0.1,20,0.05,30).Lerp(new UDim2(0.08,20,0.04,30), value)})}
                SizeConstraint={"RelativeXY"}
                BackgroundTransparency={1}
                AnchorPoint={new Vector2(0.5,0.5)}
                //ImageColor3={new Color3(240,240,240)}
                Event={{
                    MouseButton1Down: () => {
                        // this.motor.setGoal(new Flipper.Spring(0.25, {
                        //     frequency: 15,
                        //     dampingRatio: 1
                        // }))
                        playButtonSound("rbxassetid://6042053626");
                    },
                    MouseButton1Up: () => {
                        // this.motor.setGoal(new Flipper.Spring(0, {
                        //     frequency: 25,
                        //     dampingRatio: 0.75
                        // }))
                        if (this.state.shopVisible === true) {
                            this.setState({
                                shopVisible: false
                            })
                        } else {
                            this.setState({
                                shopVisible: true
                            })
                        }
                    },
                    MouseEnter: () => {
                        this.motor.setGoal(new Flipper.Spring(-0.5, {
                            frequency: 15,
                            dampingRatio: 1
                        }))
                    },
                    MouseLeave: () => {
                        this.motor.setGoal(new Flipper.Spring(0, {
                            frequency: 25,
                            dampingRatio: 0.75
                        }))
                    }
                }}>
            </textbutton>
            <frame 
                Key="CashShop"
                Size={new UDim2(0.05, 0, 0.05, 0)}
                Visible={this.state.shopVisible}
                />
        </screengui>
        
        )
    }
}

interface counterState {
    saltTotal: number,
    moneyTotal: number
}

class Counter extends Roact.Component<{},counterState> {
    private running: boolean = false;

    public constructor(props:{}) {
        super(props);
        this.setState({
            saltTotal: 0,
            moneyTotal: 0,
        })
    }

    public render(): Roact.Element{
        return(
            <screengui>
                <textlabel 
                    Key="SaltCounter"
                    Size={new UDim2(0.05, 0, 0.05, 0)}
                    Text={`${this.state.saltTotal}`}
                    />
            </screengui>
        )
    }

    public didMount() {
        this.running = true;
        let initEvent = new Net.ClientEvent("Init");
        initEvent.SendToServer();
        Net.WaitForClientEventAsync("returnSaltTotal").then(event => {
            event.Connect((cb) => {
                if (typeIs(cb, "number")) {
                    this.setState(state => {
                        return {
                            saltTotal: cb,
                            moneyTotal: state.moneyTotal
                        }
                    })
                    print(cb)
                }
                else {
                    print(`Error receiving callback from server: ${cb}`)
                }
            })
        })

    }
}


function playButtonSound(id:string){
    let sound = new Instance("Sound");
    sound.SoundId = id;
    SoundService.PlayLocalSound(sound);
    sound.Destroy();
}

function MoneyCounter() {
    return (
        <frame
        Position={new UDim2(0.065,0,0.892,0)}
        Size={new UDim2(0,23,0,28)}
        BackgroundTransparency={1}
        >
            <imagebutton
            Position={new UDim2(0.111,0,0.143,0)}
            Size={new UDim2(0,27,0,26)}
            Image="rbxassetid://6159358790"
            BackgroundTransparency={1}
            />
        </frame>
    )
}

interface mainUIState {
}

class MainUI extends Roact.Component<{}, mainUIState> {
    constructor(props: {}) {
        super(props);
        this.setState({
        })
    }

    public render(): Roact.Element {
        return (
        <screengui>
            <Shop/>
            <Counter/>
            <MoneyCounter/>
        </screengui>
        )
    }

    public didMount() {
        
    }

}

let handle = Roact.mount(<MainUI/>, PlayerGui, "UI")
