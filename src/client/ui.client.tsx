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

function ShopButton() {
    return (
        <imagebutton 
        Position={new UDim2(0.019, 0, 0.044, 0)}
        Image="rbxassetid://6159337597"
        Size={new UDim2(0,79,0,78)}
        BackgroundTransparency={1}
        ></imagebutton>
    )
}

function MoneyCounter() {
    return (
        <frame
        Position={new UDim2(0.065,0,0.892,0)}
        Size={new UDim2(0,23,0,28)}
        BackgroundTransparency={1}
        >
            <imagebutton
            Position={new UDim2(0.111,0,0.143,0)}
            Size={new UDim2(0,27,0,26)}
            Image="rbxassetid://6159358790"
            BackgroundTransparency={1}
            Event={{MouseButton1Click: () => ToggleCashShop(true)}}
            />
        </frame>
    )
}

function CashShop(props: {visible: boolean}){
    return (
        <textlabel 
        Key="Test"
        Size={new UDim2(0.05, 0, 0.05, 0)}
        Visible={props.visible}
        Text={`Hello`}/>
    )
}

function Test(props: {shopVisible: boolean}) {
    return (
        <screengui>
            <ShopButton/>
            <MoneyCounter/>
            <CashShop visible={props.shopVisible}/>
        </screengui>
    );
}

let handle = Roact.mount(<Test shopVisible={false}/>, PlayerGui, "UI")

function ToggleCashShop(visible:boolean){
    Roact.update(handle, <Test shopVisible={visible}/>)
}