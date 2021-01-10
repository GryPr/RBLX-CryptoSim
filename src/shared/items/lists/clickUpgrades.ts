import { ClickUpgrade } from "../types";

export let placeholderClickUpgradeList: Array<ClickUpgrade> = [];
for (let i = 0; i < 25; i++) {
  placeholderClickUpgradeList[i] = {
    name: `Upgrade ${i}`,
    id: i,
    image: ``,
    multiplier: {
      Base: 1 + 0.1 * i,
      Exponent: 0,
    },
  };
}

const clickUpgradeList: Array<ClickUpgrade> = [
  {
    name: "Starter 1",
    id: 1,
    image: "",
    multiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
  {
    name: "Starter 2",
    id: 1,
    image: "",
    multiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
  {
    name: "Starter 3",
    id: 1,
    image: "",
    multiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
  {
    name: "Starter 4",
    id: 1,
    image: "",
    multiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
  {
    name: "Starter 5",
    id: 1,
    image: "",
    multiplier: {
      Base: 1.1,
      Exponent: 0,
    },
  },
];
