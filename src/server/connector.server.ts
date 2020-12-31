import Net from "@rbxts/net";
import { data } from "shared/datastore";

const clickEvent = new Net.ServerThrottledEvent("Click", 120);
const returnSaltAddend = new Net.ServerEvent("returnSaltAddend")
const returnSaltTotal = new Net.ServerEvent("returnSaltTotal")
clickEvent.Connect((player:Player) => {
    print(`Server received click by ${player.Name}`);
    let salt = data.addSalt(player, 1);
    if (salt !== undefined){
        returnSaltAddend.SendToPlayer(player, salt);
        returnSaltTotal.SendToPlayer(player, () => data.getSalt(player))
    }
})
