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
        Players.GetPlayerFromCharacter(part.Parent)! === Players.LocalPlayer
      ) {
        if (touching === false) {
          print("Send hash");
          spawn(() => {
            touching = true;
            consumeHashes.SendToServer();
            wait(1);
            touching = false;
          });
        }
      }
    });

    obj.TouchEnded.Connect((part) => {
      if (
        part.Parent?.IsA("Model") &&
        part.Parent?.FindFirstAncestorOfClass("Humanoid") &&
        Players.GetPlayerFromCharacter(part.Parent)! === Players.LocalPlayer
      ) {
        let player: Player = Players?.GetPlayerFromCharacter(part.Parent)!;
        touching = false;
      }
    });
  }
}
