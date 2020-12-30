import Net from "@rbxts/net";
const Players = game.GetService("Players");
const localPlayer = Players.LocalPlayer
const localMouse = localPlayer.GetMouse()

// Manage click events
function clickEvent() {
    print("Detected click")
    let clickEvent = new Net.ClientEvent("Click");
    clickEvent.SendToServer();
}

localMouse.Button1Down.Connect(clickEvent);


