import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper"
import Net from "@rbxts/net";
import { SciNum, SciNumToolKit } from "shared/scinum";
import { PetRenderer } from "shared/items/pets";

class PetInventoryButton extends Roact.Component<{onClick:() => void},{}> {

    // public constructor() {
    //     super({})
    // }

    public render(): Roact.Element {
        return <textbutton 
        Size={new UDim2(0,100,0,100)}
        Event={
            {MouseButton1Down: this.props.onClick}
        }/>
    }
}

 interface petInventoryState {
     inventoryVisible: boolean;
 }
 
 export class PetInventory extends Roact.Component<{}, petInventoryState> {
    inventoryMotor:Flipper.SingleMotor
    inventoryBinding:Roact.RoactBinding<number>

    public constructor(props:{}){
        super(props);

        this.setState({
            inventoryVisible:false
        })

        this.inventoryMotor = new Flipper.SingleMotor(0);
        const [binding, setBinding] = Roact.createBinding(this.inventoryMotor.getValue());
        this.inventoryBinding = binding;
        this.inventoryMotor.onStep(setBinding)
    }

    toggle(){
        this.setState({
            inventoryVisible: !this.state.inventoryVisible,
        })
        if (this.state.inventoryVisible === true) {
            this.inventoryMotor.setGoal(new Flipper.Spring(0, {
                frequency: 5,
                dampingRatio: 1
            }))
        } else {
            this.inventoryMotor.setGoal(new Flipper.Spring(1, {
                frequency: 5,
                dampingRatio: 1
            }))
        }
    }

    public render(): Roact.Element {
        return (
            <screengui Key="PetUI">
                <PetInventoryButton onClick={() => this.toggle()}/>
                <scrollingframe
                Position={this.inventoryBinding.map((value) => {return new UDim2(0.5, 0, -2, 0).Lerp(new UDim2(0.5, 0, 0.5, 0), value)})}
                BackgroundColor3={new Color3(255,255,255)}
                BorderSizePixel={0}
                Size={new UDim2(0.5,0,0.8,0)}
                AnchorPoint={new Vector2(0.5,0.5)}
                ScrollBarImageColor3={new Color3(0,0,0)}>
                </scrollingframe>
            </screengui>
        )
    }
 }