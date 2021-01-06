import { SciNum } from "../../scinum";
import { Pet } from "../types";

export function getPet(id: number): [SciNum, SciNum] {
  for (const element of petList) {
    if (element.id === id) {
      return [element.SaltMultiplier, element.MoneyMultiplier];
    }
  }
  return [
    {
      Base: 1,
      Exponent: 0,
    },
    {
      Base: 1,
      Exponent: 0,
    },
  ];
}

export const petList: Array<Pet> = [
  {
    Name: "Starter",
    id: 1,
    image: "",
    rarityId: 1,
    SaltMultiplier: {
      Base: 1.1,
      Exponent: 0,
    },
    MoneyMultiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
  {
    Name: "StarterV2",
    id: 2,
    image: "",
    rarityId: 1,
    SaltMultiplier: {
      Base: 1.1,
      Exponent: 0,
    },
    MoneyMultiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
];
