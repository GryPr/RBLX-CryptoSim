import { ReplicatedStorage, Workspace } from "@rbxts/services";

class PetRenderer {
  constructor() {}

  findPetFolder(player: Player): Model | undefined {
    let character: Model = player.Character!;
    let playerPetFolder;
    if (
      character.FindFirstChild(`playerPetFolder`) &&
      character.FindFirstChild(`playerPetFolder`)?.IsA("Model")
    ) {
      playerPetFolder = character.FindFirstChild(`playerPetFolder`)!;
    } else {
      playerPetFolder = new Instance("Model", character);
      playerPetFolder.Name = `playerPetFolder`;
    }
    if (playerPetFolder.IsA("Model")) {
      return playerPetFolder;
    } else {
      return undefined;
    }
  }

  createPet(player: Player, petId: number, updateCooldown: number) {
    let character: Model = player.Character!;

    let petFolder = ReplicatedStorage.FindFirstChild(`PetModels`);
    if (petFolder === undefined) {
      return;
    }

    let petModel = petFolder.FindFirstChild(`${petId}`);
    if (petModel === undefined) {
      return;
    }

    let petInstance: Model;
    if (!petModel.IsA("Model")) {
      return;
    }
    petInstance = petModel.Clone();
    let humRootPart = character.WaitForChild("HumanoidRootPart");
    if (humRootPart.IsA("BasePart")) {
      print("moving");
      let primaryPart = petInstance.FindFirstChild("PrimaryPart")!;
      if (primaryPart.IsA("MeshPart") || primaryPart.IsA("Part")) {
        petInstance.PrimaryPart = primaryPart;
      }
      petInstance.SetPrimaryPartCFrame(new CFrame(humRootPart.Position));
    }

    let playerPetFolder: Model = this.findPetFolder(player)!;

    petInstance.Parent = playerPetFolder;

    this.animatePet(player, petInstance, 0.01);
  }

  animatePet(player: Player, pet: Model, updateCooldown: number) {
    let running: boolean = true;
    let character: Model = player.Character || player.CharacterAdded.Wait()[0];

    spawn(() => {
      let bodyPos = new Instance("BodyPosition", pet.PrimaryPart);
      bodyPos.MaxForce = new Vector3(math.huge, math.huge, math.huge);

      let bodyGyro = new Instance("BodyGyro", pet.PrimaryPart);
      bodyGyro.MaxTorque = new Vector3(math.huge, math.huge, math.huge);

      let humRootPart = character.WaitForChild("HumanoidRootPart");

      if (humRootPart.IsA("BasePart")) {
        while (running === true) {
          wait(updateCooldown);
          bodyPos.Position = new Vector3(5, 3, 5).add(humRootPart.Position);
          bodyGyro.CFrame = humRootPart.CFrame;
        }
      }
    });

    player.CharacterRemoving.Connect(() => {
      running = false;
    });
  }
}

export let PetRendererTool: PetRenderer = new PetRenderer();
