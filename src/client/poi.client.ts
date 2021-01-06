import { CollectionService } from "@rbxts/services";
import Net from "@rbxts/net";
const Players = game.GetService("Players");

let touching: boolean = false;
const consumeHashes = new Net.ClientEvent("consumeHashes");

// Detects players who touch the selling point
for (const obj of CollectionService.GetTagged("SellPoint")) {
  if (obj.IsA("Part")) {
    obj.Touched.Connect((part) => {
      if (
        obj.Parent?.IsA("Model") &&
        obj.Parent?.FindFirstAncestorOfClass("Humanoid") &&
        Players.GetPlayerFromCharacter(part.Parent)! === Players.LocalPlayer
      ) {
        let player: Player = Players.GetPlayerFromCharacter(part.Parent)!;
        touching = true;
        spawn(() => {
          while (touching) {
            wait(1);
            consumeHashes.SendToServer();
          }
        });
      }
    });

    obj.TouchEnded.Connect((part) => {
      if (
        obj.Parent?.IsA("Model") &&
        obj.Parent?.FindFirstAncestorOfClass("Humanoid") &&
        Players.GetPlayerFromCharacter(part.Parent)! === Players.LocalPlayer
      ) {
        let player: Player = Players?.GetPlayerFromCharacter(part.Parent)!;
        touching = false;
      }
    });
  }
}
