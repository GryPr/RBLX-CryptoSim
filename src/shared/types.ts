import { SciNum } from "./scinum"
import { Limit } from "./items/types"
import { Pet } from "./items/types"

export type Multiplier = {
    Key: string,
    SaltMultiplier: SciNum,
    MoneyMultiplier: SciNum
}

export type PlayerData = {
    Money: SciNum,
    Salt: SciNum,
    Multipliers: Array<Multiplier>,
    Limit: Limit,
    //PetInventory: Array<Pet>
}

export const ProfileTemplate: PlayerData = {
    Money: {
        Base: 0,
        Exponent: 0
    },
    Salt: {
        Base: 0,
        Exponent: 0
    },
    Multipliers: [{
        Key: "Base",
        SaltMultiplier: {
            Base: 1,
            Exponent: 0
        },
        MoneyMultiplier: {
            Base: 1,
            Exponent: 0
        }
    }],
    Limit: {
        hasLimit: true,
        limitUpgradeId: 1
    },
    //PetInventory: []
}