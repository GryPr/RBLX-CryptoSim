import * as Roact from "@rbxts/roact";

export const mainContext = Roact.createContext({
  viewIndex: 0,
  changeViewIndex: (index: number) => {},
});
