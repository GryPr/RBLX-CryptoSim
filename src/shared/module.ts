import * as ProfileService from "@rbxts/profileservice"
import { Profile, ProfileStore, ViewProfile } from "@rbxts/profileservice/globals";
const Players = game.GetService("Players");

var ProfileTemplate = {
	Money: 0,
	Salt: 0,
}

export function makeHello(name: string) {
	return `Hello from ${name}!`;
}

export function updateCFrameTracking() {

}

var profileServ = ProfileService.GetProfileStore(
	"PlayerData",
	ProfileTemplate
)


let Profiles = new Map<Player, Profile<String>>()

// function GiveCash(profile: Profile<Prof>, amount: number) {

// }

function playerAdded(player:Player){
	let profile = profileServ.LoadProfileAsync(
		`Player_${player.UserId}`,
		"ForceLoad"
	)
}


function playerRemoved(player:Player){
	var profile = Profiles.delete(player)
}

// Connections

Players.PlayerAdded.Connect((player) => playerAdded(player))
Players.PlayerRemoving.Connect((player) => playerRemoved(player))