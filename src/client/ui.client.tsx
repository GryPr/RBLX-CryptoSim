import * as Roact from "@rbxts/roact";
import { MainUI } from "./uiComponents/mainView"

const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
    "PlayerGui",
);

let handle = Roact.mount(<MainUI/>, PlayerGui, "UI")
