import Net from "@rbxts/net";
import { data } from "shared/datastore";
const Players = game.GetService("Players");

const initEvent = new Net.ServerEvent("Init")
const clickEvent = new Net.ServerThrottledEvent("Click", 600);
const returnSaltAddend = new Net.ServerEvent("returnSaltAddend")
const returnSaltTotal = new Net.ServerEvent("returnSaltTotal")
const returnMoneyAddend = new Net.ServerEvent("returnMoneyAddend")
const returnMoneyTotal = new Net.ServerEvent("returnMoneyTotal")

clickEvent.Connect((player:Player) => {
    // print(`Server received click by ${player.Name}`);
    let saltAddend = data.addSalt(player, 1);
    let saltTotal = data.getSalt(player);
    // print(`saltAddend: ${saltAddend} \n saltTotal: ${saltTotal}`)
    if (saltAddend !== undefined && saltTotal !== undefined){
        returnSaltAddend.SendToPlayer(player, saltAddend);
        returnSaltTotal.SendToPlayer(player, saltTotal);
    }
    else {
        print("saltAddend and/or saltTotal are undefined")
    }
})

initEvent.Connect((player:Player) => {
    print(`Initiating session for ${player.Name}`)
    wait(0.5)
    let saltTotal = data.getSalt(player);
    if (saltTotal !== undefined){
        returnSaltTotal.SendToPlayer(player, saltTotal);
    }
    let moneyTotal = data.getMoney(player);
    if (moneyTotal !== undefined){
        returnMoneyTotal.SendToPlayer(player, moneyTotal);
    }
})