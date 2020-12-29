import * as ProfileService from "@rbxts/profileservice"
import { Profile, ProfileStore, ViewProfile } from "@rbxts/profileservice/globals";
const Players = game.GetService("Players");

export function makeHello(name: string) {
	return `Hello from ${name}!`;
}

type PlayerData = {
	Money: number,
	Salt: number,
}

export class DataStore {

	Profiles = new Map<Player, Profile<PlayerData>>()

	ProfileTemplate: PlayerData = {
		Money: 0,
		Salt: 0,
	}
	profileServ = ProfileService.GetProfileStore(
		"PlayerData",
		this.ProfileTemplate
	)

	constructor(){
	}

	playerAdded(player:Player){
		let profile = this.profileServ.LoadProfileAsync(
			`Player_${player.UserId}`,
			"ForceLoad"
		)
		this.Profiles.set(player, profile as Profile<PlayerData>)
	}

	playerRemoved(player:Player){
		this.Profiles.delete(player)
	}
}