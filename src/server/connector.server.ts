import Net from "@rbxts/net";
import { data } from "shared/datastore";
const Players = game.GetService("Players");

const initEvent = new Net.ServerEvent("Init")
const clickEvent = new Net.ServerThrottledEvent("Click", 600);

const returnSaltAddend = new Net.ServerEvent("returnSaltAddend")
const returnSaltTotal = new Net.ServerEvent("returnSaltTotal")
const returnSaltExp = new Net.ServerEvent("returnSaltExp")

const returnMoneyAddend = new Net.ServerEvent("returnMoneyAddend")
const returnMoneyTotal = new Net.ServerEvent("returnMoneyTotal")
const returnMoneyExp = new Net.ServerEvent("returnMoneyExp")

const saveGame = new Net.ServerEvent("Save")

clickEvent.Connect((player:Player) => {
    // print(`Server received click by ${player.Name}`);
    let saltAddend = data.addSalt(player, 1);
    let saltTotal = data.getSalt(player);
    // print(`saltAddend: ${saltAddend} \n saltTotal: ${saltTotal}`)
    if (saltAddend !== undefined && saltTotal !== undefined){
        //returnSaltAddend.SendToPlayer(player, saltAddend);
        returnSaltTotal.SendToPlayer(player, saltTotal);
    }
    else {
        print("saltAddend and/or saltTotal are undefined")
    }
})

initEvent.Connect((player:Player) => {
    print(`Initiating session for ${player.Name}`)

    let promise = new Promise((resolve, reject) => {
        while (true) {
            wait(0.2)
            if (data.getSalt(player) !== undefined && data.getMoney(player) !== undefined){
                resolve(true)
            }
        }
    })

    promise.then(() => {
        let saltTotal = data.getSalt(player);
        let moneyTotal = data.getMoney(player);
        returnSaltTotal.SendToPlayer(player, saltTotal);
        returnMoneyTotal.SendToPlayer(player, moneyTotal);
    })
})

saveGame.Connect((player:Player) => {
    data.playerSaveData(player);
})