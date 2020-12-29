import * as Roact from "@rbxts/roact";
const Players = game.GetService("Players");

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
    "PlayerGui",
);

interface CounterUI {
    name: string;
}

function Counter(props: {name: string}) {
    return <textlabel 
    Key="Test"
    Size={new UDim2(0.05, 0, 0.05, 0)}
    Text={`Hello, ${props.name}`}/>
}

function Test() {
    return (
        <screengui>
            <Counter name="Test"/>
        </screengui>
    );
}

const testElement = <Test/>

Roact.mount(testElement, PlayerGui, "UI")