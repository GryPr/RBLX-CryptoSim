import { SciNum } from "../scinum";

export type Area = {};

export type Pet = {
  Name: string;
  id: number;
  image: string;
  rarityId: number;
  SaltMultiplier: SciNum;
  MoneyMultiplier: SciNum;
};

export type PetRarity = {
  Name: string;
  id: number;
  color: Color3;
};

export type ClickUpgrade = {
  name: string;
  id: number;
  image: string;
  multiplier: SciNum;
};

export type LimitUpgrade = {
  name: string;
  id: number;
  image: string;
  limit: SciNum;
};

export type Limit = {
  hasLimit: boolean;
  limitUpgradeId: number;
};
