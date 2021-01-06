import { SciNum } from "./scinum";
import { Limit, ClickUpgrade } from "./items/types";
import { Pet } from "./items/types";

export type Multiplier = {
  Key: string;
  SaltMultiplier: SciNum;
  MoneyMultiplier: SciNum;
};

export type PlayerData = {
  Money: SciNum;
  Salt: SciNum;
  ClickUpgrade: ClickUpgrade;
  Limit: Limit;
  PetInventory: Array<number>;
};

export const ProfileTemplate: PlayerData = {
  Money: {
    Base: 0,
    Exponent: 0,
  },
  Salt: {
    Base: 0,
    Exponent: 0,
  },
  ClickUpgrade: {
    name: "Starter",
    id: 1,
    image: "",
    multiplier: {
      Base: 1,
      Exponent: 0,
    },
  },
  Limit: {
    hasLimit: true,
    limitUpgradeId: 1,
  },
  PetInventory: [],
};
