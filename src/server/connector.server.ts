import Net from "@rbxts/net";
import { data } from "shared/datastore";

const clickEvent = new Net.ServerThrottledEvent("Click", 120);
clickEvent.Connect((player:Player) => {
    print(`Server received click by ${player.Name}`);
    data.addSalt(player, 1);
});


