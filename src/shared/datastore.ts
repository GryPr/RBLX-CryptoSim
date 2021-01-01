import * as ProfileService from "@rbxts/profileservice"
import { Profile, ProfileStore, ViewProfile } from "@rbxts/profileservice/globals";
import {PlayerData, ProfileTemplate} from "./types"
import {SciNum, SciNumToolKit} from "./scinum"
const Players = game.GetService("Players");

export class DataStore {

    Profiles = new Map<Player, Profile<PlayerData>>()

	profileServ = ProfileService.GetProfileStore(
		"PlayerData",
		ProfileTemplate
	)

	constructor(){}

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
    
    addSalt(player:Player, clicks:number): void | SciNum {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Salt === undefined) {
            profile.Data.Salt = {
                Base: 0,
                Exponent: 1,
            };
        }
        print(profile)
        let addend = this.calculateSalt(player, {Base: clicks, Exponent: 1})
        profile.Data.Salt = SciNumToolKit.add(profile.Data.Salt, addend);
        // TODO: Deal with exponential
        return addend;
    }

    getSalt(player:Player): void | SciNum {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Salt === undefined) {
            profile.Data.Salt = {
                Base: 0,
                Exponent: 1,
            };
        }
        return profile.Data.Salt;
    }

    // getSaltExp(player:Player): void | number {
    //     let profile = this.Profiles.get(player);
    //     profile?.Reconcile()
    //     if (profile === undefined) {
    //         return;
    //     }
    //     if (profile.Data.SaltExp === undefined) {
    //         profile.Data.SaltExp = 1;
    //     }
    //     return profile.Data.SaltExp;
    // }

    sellSalt(player:Player): void | number {
        let profile = this.Profiles.get(player);
        profile?.Reconcile();
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Salt === undefined) {
            profile.Data.Salt = {
                Base: 0,
                Exponent: 1
            };
            return;
        }
        // let salt:number = profile.Data.Salt;
    }

    addMoney(player:Player, money:number){
        let profile = this.Profiles.get(player)
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Money === undefined) {
            profile.Data.Money = {
                Base: 0,
                Exponent: 1
            };
        }
    }

    getMoney(player:Player): void | SciNum {
        let profile = this.Profiles.get(player);
        profile?.Reconcile()
        if (profile === undefined) {
            return;
        }
        if (profile.Data.Money === undefined) {
            profile.Data.Money = {
                Base: 0,
                Exponent: 1
            };
        }
        return profile.Data.Money;
    }

    calculateMultiplier(player:Player){
        let profile = this.Profiles.get(player);
        let multiplier:SciNum = {
            Base: 1,
            Exponent: 1
        };
        profile?.Data.Multipliers.forEach((element) => {multiplier=SciNumToolKit.multiply(multiplier, element)});
        return multiplier;
    }

    calculateSalt(player:Player, salt:SciNum) {
        return SciNumToolKit.multiply(this.calculateMultiplier(player),salt);
    }
}

export let data = new DataStore()