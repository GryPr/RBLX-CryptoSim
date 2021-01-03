import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper"
import Net from "@rbxts/net";
import { SciNum, SciNumToolKit } from "shared/scinum";
import { PetRenderer } from "shared/items/pets";
import { Pet } from "shared/items/types";
import { Workspace, RunService, TweenService } from "@rbxts/services"
import { GreyTextButton } from "./misc"

 interface petInventoryState {
     inventoryVisible: boolean;
 }

 interface petInventoryProps {
     petInventoryList: Array<Pet>
 }
 
 export class PetInventory extends Roact.Component<petInventoryProps, petInventoryState> {
    inventoryMotor:Flipper.SingleMotor
    inventoryBinding:Roact.RoactBinding<number>

    public constructor(props: petInventoryProps){
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
                frequency: 1,
                dampingRatio: 0.5
            }))
        } else {
            this.inventoryMotor.setGoal(new Flipper.Spring(1, {
                frequency: 2,
                dampingRatio: 0.8
            }))
        }
    }

    public render(): Roact.Element {
        return (
            <screengui Key="PetUI">
                <frame
                Position={this.inventoryBinding.map((value) => {return new UDim2(0.5, 0, -2, 0).Lerp(new UDim2(0.5, 0, 0.5, 0), value)})}
                Size={new UDim2(0.5,0,0.8,0)}
                AnchorPoint={new Vector2(0.5,0.5)}
                BackgroundTransparency={0.1}
                BorderSizePixel={0}
                BackgroundColor3={new Color3(255,255,255)}
                >
                    <uiaspectratioconstraint Key="aspectRatio"/>
                    <scrollingframe
                    Key={"Inventory"}
                    BackgroundTransparency={1}
                    AnchorPoint={new Vector2(0.5,0.5)}
                    Position={new UDim2(0.5,0,0.5,0)}
                    Size={new UDim2(0.95,0,0.95,0)}
                    ScrollBarImageColor3={new Color3(0,0,0)}
                    BorderSizePixel={0}
                    ScrollBarImageTransparency={0.5}
                    VerticalScrollBarInset="ScrollBar">
                        <uigridlayout Key="gridLayout" CellSize={new UDim2(0.2,0,0.2,0)} CellPadding={new UDim2(0.025,0,0.025,0)} HorizontalAlignment="Center">
                            <uiaspectratioconstraint Key="aspectRatio"/>
                        </uigridlayout>
                        {this.props.petInventoryList.map((item, index) => {
                            return (
                                <PetInventoryItem Key={`${index + 1}`} onClick={() => this.toggle()}></PetInventoryItem>
                            // <textbutton Key={index} Text={item.Name}></textbutton>
                                )
                        })}
                    </scrollingframe>

                </frame>
                <PetInventoryOpenButton onClick={() => this.toggle()}/>

            </screengui>
        )
    }
 }

 class PetInventoryOpenButton extends Roact.Component<{onClick:() => void},{}> {

    public render(): Roact.Element {
        return <GreyTextButton
        Key={"OpenPetInventory"}
        Size={new UDim2(0.1,0,0.1,0)}
        Position={new UDim2(0.01,0,0.05,0)}
        onClick={this.props.onClick}
        Text={"Pet Inventory"}/>
    }
}

interface petInventoryItemProps {
    onclick: any,
}

interface petInventoryItemStates {
    viewportCFrame: CFrame,
    rotation: number,
}

class PetInventoryItem extends Roact.Component<petInventoryItemProps, petInventoryItemStates> {
    
    currentCamera: Camera = new Instance("Camera");
    viewportRef:Roact.Ref<ViewportFrame>;
    model: Model = this.getModel()!;

    public constructor(props: any){
        super(props);

        this.viewportRef = Roact.createRef<ViewportFrame>()
        this.currentCamera.CameraType = Enum.CameraType.Scriptable;
        
        this.model.MoveTo(new Vector3(0,0,0));
        this.setState({
            viewportCFrame: new CFrame(new Vector3(0,1000,0)).mul(CFrame.Angles(0, math.rad(0), 0)),
            rotation: 0,
        })
    }

    getModel(): Model | undefined {
        let model:Instance = Workspace.WaitForChild("Pet")! // placeholder
        if (model.IsA("Model")) {
            let newModel:Model = model.Clone();
            let primaryPart = newModel.FindFirstChild("PrimaryPart")!;
            if (primaryPart.IsA("MeshPart") || primaryPart.IsA("Part")){
                newModel.PrimaryPart = primaryPart;
            }
            newModel.SetPrimaryPartCFrame(new CFrame(new Vector3(0,0,0)));
            return newModel;
        } else {
            return;
        }
    }

    getMaxDistance(): number {
        let model:Model = this.model;
        let size:Vector3 = model.GetBoundingBox()[1];
        return math.max(size.X, size.Y, size.Z) + 1;
    }

    renderModel(){
        let maxDistance = this.getMaxDistance();
        let distance = (maxDistance/(math.tan(math.rad(this.currentCamera.FieldOfView))))
        let currentDistance = (maxDistance/2) + distance
        this.setState({
            viewportCFrame: CFrame.Angles(0, math.rad(this.state.rotation), 0).mul(new CFrame(new Vector3(0,0,currentDistance)))
        })
        this.currentCamera.CFrame = this.state.viewportCFrame;
    }

    public render(): Roact.Element {
        return (
            <imagelabel Image={"rbxassetid://6182082398"} BackgroundTransparency={1}>
            <viewportframe CurrentCamera={this.currentCamera} Ref={this.viewportRef} Size={new UDim2(1,0,1,0)} BackgroundTransparency={1}>
            </viewportframe>
            </imagelabel>
)
    }

    public didMount() {
        this.model.Parent = this.viewportRef.getValue();
        this.currentCamera.Parent = this.viewportRef.getValue();
        spawn(() => {
            RunService.RenderStepped.Connect(() => {
                this.renderModel();
                this.setState({
                    rotation: this.state.rotation + 1,
                })
            })
        })
    }

}