import { ServerStorage, Workspace } from "@rbxts/services";

export class PetRenderer {

    constructor(){}

    findPetFolder(player:Player):Model | undefined{
        let character:Model = player.Character!;
        let playerPetFolder;
        if (character.FindFirstChild(`playerPetFolder`) && character.FindFirstChild(`playerPetFolder`)?.IsA("Model")){
            playerPetFolder = character.FindFirstChild(`playerPetFolder`)!
        } else {
            playerPetFolder = new Instance("Model", character);
        }
        if (playerPetFolder.IsA("Model")){
            return playerPetFolder;
        } else {
            return undefined;
        }
    }

    createPet(player:Player, petId:number){
        let character:Model = player.Character!;

        let petFolder = ServerStorage.FindFirstChild(`PetModels`);
        if (petFolder === undefined) {
            return;
        }

        let petModel = petFolder.FindFirstChild(`${petId}`);
        if (petModel === undefined) {
            return;
        }

        let petInstance:Model;
        if (!petModel.IsA("Model")){
            return;
        }
        petInstance = petModel.Clone();

        let playerPetFolder:Model = this.findPetFolder(player)!;
        
        petInstance.Parent = playerPetFolder;

    }

    animatePet(player:Player, updateCooldown:number){
        let running:boolean=false;

        player.CharacterAdded.Connect(() => {
            running = true;
            spawn(() => {
                let character:Model = player.Character || player.CharacterAdded.Wait()[0];
                let playerPetFolder:Model = this.findPetFolder(player)!;

                let counter = 0;

                for (let pet of playerPetFolder.GetChildren()){
                    counter += 1;
                    if (pet.IsA("Model")){

                        spawn(() => {
                            let bodyPos = new Instance("BodyPosition", pet);
                            bodyPos.MaxForce = new Vector3(math.huge, math.huge, math.huge);

                            let bodyGyro = new Instance("BodyGyro", pet);
                            bodyGyro.MaxTorque = new Vector3(math.huge, math.huge, math.huge);

                            let humRootPart = character.WaitForChild("HumanoidRootPart");

                            let variation = counter+1;

                            if (humRootPart.IsA("BasePart")){
                                while(running === true){
                                    wait(updateCooldown)
                                    bodyPos.Position = humRootPart.Position.add(new Vector3(2+variation,2+variation,3));
                                    bodyGyro.CFrame = humRootPart.CFrame;
                                }
                            }
                        })

                    }
                    else {
                        continue;
                    }
                }

            })
        })

        player.CharacterRemoving.Connect(() => {
            running = false;
        })

    }
}