import * as ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { PlayerData, ProfileTemplate } from "./types";
import { SciNum, SciNumToolKit } from "./scinum";
import { getPet } from "./items/lists/pets";
const Players = game.GetService("Players");

export class DataStore {
  Profiles = new Map<Player, Profile<PlayerData>>();
  CachedProfiles = new Map<Player, PlayerData>();

  profileServ = ProfileService.GetProfileStore(
    "PlayerData_Test_1",
    ProfileTemplate
  );

  constructor() {}

  playerAdded(player: Player) {
    // Setting up the ProfileService profiles
    let profile = this.profileServ.LoadProfileAsync(
      `Player_${player.UserId}`,
      "ForceLoad"
    );
    if (profile === undefined) {
      return;
    }
    profile?.Reconcile();
    this.Profiles.set(player, profile);

    // Setting up the profile cache
    let cachedProfile: PlayerData = {
      Money: profile.Data.Money,
      Salt: profile.Data.Salt,
      ClickUpgrade: profile.Data.ClickUpgrade,
      Limit: profile.Data.Limit,
      PetInventory: profile.Data.PetInventory,
    };
    this.CachedProfiles.set(player, cachedProfile);
  }

  playerRemoved(player: Player) {
    this.playerSaveData(player);
    this.CachedProfiles.delete(player);
    this.Profiles.delete(player);
  }

  playerSaveData(player: Player) {
    print(`Saving data of ${player.Name}`);
    let profile = this.Profiles.get(player)!;
    let cachedProfile = this.CachedProfiles.get(player)!;
    profile?.Reconcile();
    profile.Data = {
      Money: cachedProfile.Money,
      Salt: cachedProfile.Salt,
      ClickUpgrade: cachedProfile.ClickUpgrade,
      Limit: cachedProfile.Limit,
      PetInventory: cachedProfile.PetInventory,
    };
  }

  addSalt(player: Player, clicks: number): void | SciNum {
    let profile = this.CachedProfiles.get(player);
    if (profile === undefined) {
      return;
    }
    if (profile.Salt === undefined) {
      profile.Salt = {
        Base: 0,
        Exponent: 0,
      };
    }
    let addend = this.calculateSalt(player, { Base: clicks, Exponent: 0 });
    profile.Salt = SciNumToolKit.add(profile.Salt, addend);
    print(profile);
    return addend;
  }

  getSalt(player: Player): void | SciNum {
    let profile = this.CachedProfiles.get(player);
    if (profile === undefined) {
      return;
    }
    if (profile.Salt === undefined) {
      profile.Salt = {
        Base: 0,
        Exponent: 0,
      };
    }
    return profile.Salt;
  }

  sellSalt(player: Player): void | number {
    let profile = this.CachedProfiles.get(player)!;
    if (profile.Salt === undefined) {
      profile.Salt = {
        Base: 0,
        Exponent: 0,
      };
      return;
    }
  }

  addMoney(player: Player, money: number) {
    let profile = this.CachedProfiles.get(player)!;
    if (profile === undefined) {
      return;
    }
    if (profile.Money === undefined) {
      profile.Money = {
        Base: 0,
        Exponent: 0,
      };
    }
  }

  getMoney(player: Player): void | SciNum {
    let profile = this.CachedProfiles.get(player);
    if (profile === undefined) {
      return;
    }
    if (profile.Money === undefined) {
      profile.Money = {
        Base: 0,
        Exponent: 0,
      };
    }
    return profile.Money;
  }

  calculateSaltMultiplier(player: Player) {
    let profile = this.CachedProfiles.get(player);
    let multiplier: SciNum = {
      Base: 1,
      Exponent: 0,
    };
    profile?.PetInventory.forEach((element) => {
      multiplier = SciNumToolKit.multiply(multiplier, getPet(element)[0]);
    });
    return multiplier;
  }

  calculateSalt(player: Player, salt: SciNum) {
    return SciNumToolKit.multiply(this.calculateSaltMultiplier(player), salt);
  }

  calculateMoneyMultiplier(player: Player) {
    let profile = this.CachedProfiles.get(player);
    let multiplier: SciNum = {
      Base: 1,
      Exponent: 0,
    };
    profile?.PetInventory.forEach((element) => {
      multiplier = SciNumToolKit.multiply(multiplier, getPet(element)[1]);
    });
    return multiplier;
  }
}

export let data = new DataStore();
