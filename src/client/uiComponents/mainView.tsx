import * as Roact from "@rbxts/roact";
import { PetInventory } from "./pet";
import { Counter } from "./counter";
import { testPetInventory } from "../testValues/testPetInventory";

export const mainContext = Roact.createContext({
  viewIndex: 0,
  changeViewIndex: (index: number) => {},
});

interface mainUIState {
  viewIndex: number;
}

export class MainUI extends Roact.Component<{}, mainUIState> {
  constructor(props: {}) {
    super(props);
    this.setState({
      viewIndex: 0,
    });
  }

  changeViewIndex(index: number) {
    this.setState({
      viewIndex: index,
    });
  }

  public render(): Roact.Element {
    return (
      <screengui>
        <mainContext.Provider
          value={{
            viewIndex: this.state.viewIndex,
            changeViewIndex: this.changeViewIndex,
          }}
        >
          <Counter />
          <PetInventory petInventoryList={testPetInventory} />
        </mainContext.Provider>
      </screengui>
    );
  }

  public didMount() {}
}
