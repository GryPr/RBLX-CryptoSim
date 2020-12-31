import NetClientEvent from "@rbxts/net/out/ClientEvent";

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