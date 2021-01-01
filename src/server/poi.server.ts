import { CollectionService } from "@rbxts/services"
const Players = game.GetService("Players");

// Detects players who touch the selling point
for (const obj of CollectionService.GetTagged("SellPoint")) {

    if (obj.IsA("Part")){

        obj.Touched.Connect((part) => {
            if (obj.Parent?.IsA("Model") && obj.Parent?.FindFirstAncestorOfClass("Humanoid")){
                let player:Player = Players.GetPlayerFromCharacter(part.Parent)!;
                
            }
        })

        obj.TouchEnded.Connect((part) => {
            if (obj.Parent?.IsA("Model") && obj.Parent?.FindFirstAncestorOfClass("Humanoid")){
                let player:Player = Players?.GetPlayerFromCharacter(part.Parent)!;
            }
        })

    }
}