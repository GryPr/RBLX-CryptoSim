import * as ProfileService from "@rbxts/profileservice"
import { Profile, ProfileStore, ViewProfile } from "@rbxts/profileservice/globals";
import {PlayerData, ProfileTemplate} from "./types"
const Players = game.GetService("Players");

export class DataStore {

    Profiles = new Map<Player, Profile<PlayerData>>()

	profileServ = ProfileService.GetProfileStore(
		"PlayerData",
		ProfileTemplate
	)

	constructor(){
	}

	playerAdded(player:Player){
		let profile = this.profileServ.LoadProfileAsync(
			`Player_${player.UserId}`,
			"ForceLoad"
        )
        if (profile === undefined) {
            return
        }
		this.Profiles.set(player, profile)
	}

	playerRemoved(player:Player){
		this.Profiles.delete(player)
    }
    
    addSalt(player:Player, clicks:number): void | number {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Salt === undefined) {
            profile.Data.Salt = 0;
        }
        print(profile)
        let addend = this.calculateSalt(player, clicks)
        profile.Data.Salt += addend;
        // TODO: Deal with exponential
        if (profile.Data.Salt > 10) {
        }
        return addend;
    }

    getSalt(player:Player): void | number {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Salt === undefined) {
            profile.Data.Salt = 0;
        }
        return profile.Data.Salt;
    }

    addMoney(player:Player, money:number){
        let profile = this.Profiles.get(player)
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Money === undefined) {
            profile.Data.Money = 0;
        }
    }

    getMoney(player:Player): void | number {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Money === undefined) {
            profile.Data.Money = 0;
        }
        return profile.Data.Money;
    }

    calculateMultiplier(player:Player){
        let profile = this.Profiles.get(player);
        let multiplier:number = 1;
        profile?.Data.Multipliers.forEach((element) => {multiplier*=element});
        return multiplier;
    }

    calculateSalt(player:Player, salt:number) {
        return this.calculateMultiplier(player)*salt;
    }
}

export let data = new DataStore()