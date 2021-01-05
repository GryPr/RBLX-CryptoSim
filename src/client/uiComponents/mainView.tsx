import * as Roact from "@rbxts/roact";
import { Counter } from "./counter/counter";
import { MainButtons } from "./mainButtons";
import { mainContext } from "./mainContext";
import { ClickUpgradeView } from "./clickUpgrade/clickUpgradeView";
import { PetInventoryView } from "./pet/petInventoryView";
import { LimitUpgradeView } from "./limitUpgrade/limitUpgrade";

interface mainUIState {
  viewIndex: number;
  changeViewIndex: (index: number) => void;
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
          <ClickUpgradeView />
          <PetInventoryView />
          <LimitUpgradeView />
        </mainContext.Provider>
      </screengui>
    );
  }
}
