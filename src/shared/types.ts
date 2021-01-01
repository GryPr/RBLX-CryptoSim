import { SciNum } from "./scinum"

export type Pet = {
    Name: string,
    SaltMultiplier: SciNum,
    MoneyMultiplier: SciNum
}

export type Multiplier = {
    Key: string,
    SaltMultiplier: SciNum,
    MoneyMultiplier: SciNum
}

export type PlayerData = {
    Money: SciNum,
    Salt: SciNum,
    Multipliers: Array<Multiplier>
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
}