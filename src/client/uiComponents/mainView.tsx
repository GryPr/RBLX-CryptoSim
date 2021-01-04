import * as Roact from "@rbxts/roact";
import { PetInventory } from "./pet/pet";
import { Counter } from "./counter/counter";
import { testPetInventory } from "../testValues/testPetInventory";
import { MainButtons } from "./mainButtons";
import { mainContext } from "./mainContext";

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
            changeViewIndex: (index: number) => this.changeViewIndex(index),
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

export class UI extends Roact.Component<{}, mainUIState> {
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
    print(`view: ${index}`);
  }

  public render(): Roact.Element {
    return (
      <screengui Key={"MainUI"}>
        <mainContext.Provider
          value={{
            viewIndex: this.state.viewIndex,
            changeViewIndex: (index: number) => this.changeViewIndex(index),
          }}
        >
          <MainButtons />
          <Counter />
        </mainContext.Provider>
      </screengui>
    );
  }
}
