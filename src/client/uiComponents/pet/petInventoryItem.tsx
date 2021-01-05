import * as Roact from "@rbxts/roact";
import { PetRendererTool } from "shared/items/pets";
import { RunService, ReplicatedStorage } from "@rbxts/services";

const Players = game.GetService("Players");
const player = Players.LocalPlayer;

interface petInventoryItemProps {
  // onclick: any;
  petId: number;
}

interface petInventoryItemStates {
  viewportCFrame: CFrame;
  rotation: number;
}

export class PetInventoryItem extends Roact.Component<
  petInventoryItemProps,
  petInventoryItemStates
> {
  currentCamera: Camera = new Instance("Camera");
  viewportRef: Roact.Ref<ViewportFrame>;
  model: Model;

  public constructor(props: any) {
    super(props);

    this.viewportRef = Roact.createRef<ViewportFrame>();
    this.currentCamera.CameraType = Enum.CameraType.Scriptable;
    print(this.props.petId);

    this.model = this.getModel(this.props.petId)!;

    this.setState({
      viewportCFrame: new CFrame(new Vector3(0, 1000, 0)).mul(
        CFrame.Angles(0, math.rad(0), 0)
      ),
      rotation: 0,
    });
  }

  getModel(petId: number): Model | undefined {
    let petFolder = ReplicatedStorage.FindFirstChild(`PetModels`);
    if (petFolder === undefined) {
      return;
    }

    let model = petFolder.FindFirstChild(`${petId}`);
    if (model === undefined) {
      return;
    }

    if (model.IsA("Model")) {
      let newModel: Model = model.Clone();
      let primaryPart = newModel.FindFirstChild("PrimaryPart")!;
      if (primaryPart.IsA("MeshPart") || primaryPart.IsA("Part")) {
        newModel.PrimaryPart = primaryPart;
      }
      newModel.SetPrimaryPartCFrame(new CFrame(new Vector3(0, 0, 0)));
      return newModel;
    } else {
      return;
    }
  }

  getMaxDistance(): number {
    let model: Model = this.model;
    let size: Vector3 = model.GetBoundingBox()[1];
    return math.max(size.X, size.Y, size.Z) + 1;
  }

  renderModel() {
    let maxDistance = this.getMaxDistance();
    let distance =
      maxDistance / math.tan(math.rad(this.currentCamera.FieldOfView));
    let currentDistance = maxDistance / 2 + distance;
    this.setState({
      viewportCFrame: CFrame.Angles(0, math.rad(this.state.rotation), 0).mul(
        new CFrame(new Vector3(0, 0, currentDistance))
      ),
    });
    this.currentCamera.CFrame = this.state.viewportCFrame;
  }

  public render(): Roact.Element {
    return (
      <imagelabel Image={"rbxassetid://6182082398"} BackgroundTransparency={1}>
        <viewportframe
          CurrentCamera={this.currentCamera}
          Ref={this.viewportRef}
          Size={new UDim2(1, 0, 1, 0)}
          BackgroundTransparency={1}
        >
          <textbutton
            Text={``}
            BackgroundTransparency={1}
            Size={new UDim2(1, 0, 1, 0)}
            Event={{
              MouseButton1Down: () => {
                PetRendererTool.createPet(player, this.props.petId, 0.1);
              },
            }}
          ></textbutton>
        </viewportframe>
      </imagelabel>
    );
  }

  public didMount() {
    if (this.model !== undefined) {
      this.model.Parent = this.viewportRef.getValue();
      this.currentCamera.Parent = this.viewportRef.getValue();
      spawn(() => {
        RunService.RenderStepped.Connect(() => {
          this.renderModel();
          this.setState({
            rotation: this.state.rotation + 1,
          });
        });
      });
    }
  }
}
