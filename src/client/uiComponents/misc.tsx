import * as Roact from "@rbxts/roact";
import * as Flipper from "@rbxts/flipper"

interface greyTextButtonProps {
    onClick?: any,
    Text?: string
    Size?: UDim2,
    Position?: UDim2
}

export class GreyTextButton extends Roact.Component<greyTextButtonProps>{

    public constructor(props: any){
        super(props);
        
    }

    static defaultProps: greyTextButtonProps = {
        Text: "GreyTextButton",
        Size: new UDim2(0,100,0,100),
        Position: new UDim2(0,0,0,0)
    }
    
    public render(): Roact.Element {
        return (
            <imagebutton Event={
                {MouseButton1Down: this.props.onClick}}
                Image={"rbxassetid://6182140353"}
                BackgroundTransparency={1}
                Size={this.props.Size}
                Position={this.props.Position}
                >
            <uiaspectratioconstraint AspectRatio={3}/>
            <textlabel Text={this.props.Text} Size={new UDim2(1,0,1,0)} BackgroundTransparency={1}></textlabel>
            </imagebutton>
        )
    }

}