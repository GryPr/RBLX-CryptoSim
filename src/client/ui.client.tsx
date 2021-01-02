import * as Roact from "@rbxts/roact";
import { PetInventory } from "./uiComponents/pet"
import { Counter } from "./uiComponents/counter" 

const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
    "PlayerGui",
);

interface mainUIState {
}

class MainUI extends Roact.Component<{}, mainUIState> {
    constructor(props: {}) {
        super(props);
        this.setState({
        })
    }

    public render(): Roact.Element {
        return (
        <screengui>
            {/* <Shop/> */}
            <Counter/>
            <PetInventory/>
        </screengui>
        )
    }

    public didMount() {
        
    }

}

let handle = Roact.mount(<MainUI/>, PlayerGui, "UI")
