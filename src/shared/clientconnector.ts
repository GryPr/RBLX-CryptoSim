import Net from "@rbxts/net";
import NetClientEvent from "@rbxts/net/out/ClientEvent";
const Players = game.GetService("Players");
const localPlayer = Players.LocalPlayer
const localMouse = localPlayer.GetMouse()

class ClientConnector {

    clickEvent:NetClientEvent;

    constructor(){
        this.clickEvent = new NetClientEvent("Click");
    }

    playerClick(){
        this.clickEvent.SendToServer();
    }

}

export let client = new ClientConnector();