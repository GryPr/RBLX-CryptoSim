export type Pet = {
    Name: string,
    SaltMultiplier: number,
    MoneyMultiplier: number,
}

export type PlayerData = {
    Money: number,
    MoneyExp: number,
    Salt: number,
    SaltExp: number,
    Multipliers: Array<number>
}

export const ProfileTemplate: PlayerData = {
    Money: 0,
    MoneyExp: 1,
    Salt: 0,
    SaltExp: 1,
    Multipliers: [1],
}