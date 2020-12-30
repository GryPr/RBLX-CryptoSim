import { data } from "shared/datastore"
import { CollectionService } from "@rbxts/services"
const Players = game.GetService("Players");

for (const obj of CollectionService.GetTagged("Kill")) {
    if (obj.IsA("Model")){
        for (const child of obj.GetChildren()){
            print(child.Name)
            if (child.IsA("Part")){
                child.Touched.Connect((part) => part.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(5));
                child.Color = Color3.fromRGB(255,255,255)
            }
        }
        // var cframe = obj.GetPrimaryPartCFrame()
        // obj.Touched.Connect((part) => part.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(5));
    }
}

Players.PlayerAdded.Connect((player) => data.playerAdded(player))
Players.PlayerRemoving.Connect((player) => data.playerRemoved(player))