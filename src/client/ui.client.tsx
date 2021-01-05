import * as Roact from "@rbxts/roact";
import { MainUI, UI } from "./uiComponents/mainView";

const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass("PlayerGui");

let handle = Roact.mount(<UI />, PlayerGui, "UI");
