import * as Roact from "@rbxts/roact";
const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
    "PlayerGui",
);

interface CounterUI {
    name: string;
}

class Counter extends Roact.Component<CounterUI> {
    public render(): Roact.Element {
        return (
            <textlabel Text={`Hello, ${this.props.name}`} />
        )
    }
}

const testElement = <Test/>

export function Test(props: {}) {
    return (
        <screengui>
            <Counter name="Test"/>
        </screengui>
    )
}

Roact.mount(testElement, PlayerGui, "UI")