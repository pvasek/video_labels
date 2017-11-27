import * as React from "react";
import { observer } from "mobx-react";
import { AppModel } from "./AppModel";
import { MouseEvent } from "react";
import { AppToolbar } from "./AppToolbar";
import { Canvas } from "./Canvas";

export class AppProps {
    model: AppModel;
}

@observer
export class App extends React.Component<AppProps> {
    selectImage(e: MouseEvent<any>, id: string) {
        e.preventDefault();
        e.stopPropagation();
        this.props.model.selectImage(id);
    }

    render() {
        const { model } = this.props;        
        return <div className="label-maker">            
            <AppToolbar model={model} />
            {model.selectedImageId && <div className="image">                    
                <Canvas model={model.canvasModel} />
            </div>}            
        </div>;
    }
}
