import { LimitUpgrade } from "../types";

export let placeholderClickUpgradeList: Array<LimitUpgrade> = [];
for (let i = 0; i < 25; i++) {
  placeholderClickUpgradeList[i] = {
    name: `Backpack ${i}`,
    id: i,
    image: ``,
    limit: {
      Base: 1 + 0.5 * i,
      Exponent: 1,
    },
  };
}

const limitUpgradeList: Array<LimitUpgrade> = [
  {
    name: "Basic backpack",
    id: 1,
    image: "",
    limit: {
      Base: 1,
      Exponent: 1,
    },
  },
  {
    name: "Basic backpack",
    id: 2,
    image: "",
    limit: {
      Base: 5,
      Exponent: 1,
    },
  },
  {
    name: "Basic backpack",
    id: 3,
    image: "",
    limit: {
      Base: 1,
      Exponent: 2,
    },
  },
  {
    name: "Basic backpack",
    id: 4,
    image: "",
    limit: {
      Base: 5,
      Exponent: 2,
    },
  },
];
