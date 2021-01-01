import { SciNum } from "./scinum"

export type Pet = {
    Name: string,
    SaltMultiplier: SciNum,
    MoneyMultiplier: SciNum,
}

export type PlayerData = {
    Money: SciNum,
    Salt: SciNum,
    Multipliers: Array<SciNum>
}

export const ProfileTemplate: PlayerData = {
    Money: {
        Base: 0,
        Exponent: 1
    },
    Salt: {
        Base: 0,
        Exponent: 1
    },
    Multipliers: [{
        Base: 1,
        Exponent: 1
    }],
}