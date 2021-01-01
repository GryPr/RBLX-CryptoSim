import NetClientEvent from "@rbxts/net/out/ClientEvent";

class ClientConnector {

    clickEvent:NetClientEvent;
    saveEvent:NetClientEvent;

    constructor(){
        this.clickEvent = new NetClientEvent("Click");
        this.saveEvent = new NetClientEvent("Save")
    }

    playerClick(){
        this.clickEvent.SendToServer();
    }

    saveGame(){
        this.saveEvent.SendToServer();
    }

}

export let client = new ClientConnector();