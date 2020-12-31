import { client } from "shared/clientconnector"
const Players = game.GetService("Players");
const localPlayer = Players.LocalPlayer
const localMouse = localPlayer.GetMouse()

// Detects clicks
localMouse.Button1Down.Connect(() => client.playerClick());


