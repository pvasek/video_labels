import * as React from "react";
import { observer } from "mobx-react";
import { AppModel } from "./AppModel";
import { MouseEvent } from "react";

export class ToolbarProps {
    model: AppModel;
}

@observer
export class AppToolbar extends React.Component<ToolbarProps> {
    render() {
        const { model } = this.props;        
        return <div className="toolbar">
                    <select value={model.selectedGroup ? model.selectedGroup.id : ""}>
                        {model.groups.map(i => <option key={i.id}>
                            {i.name}
                        </option>)}
                    </select>
                    <button 
                        onClick={model.selectPrevious} 
                        className="btn btn-primary"
                    >
                        &lt;
                    </button>
                    <button 
                        onClick={model.selectNext}
                        className="btn btn-primary"
                    >
                        &gt;
                    </button>
                    <span className="seperator"/>
                    <button className="btn btn-primary" onClick={e => model.selectNoBall()}>No ball</button>
                    <span className="seperator"/>
                    {[300, 400, 600, 800, 1000].map(i => 
                        <button 
                            key={i}
                            onClick={e => model.setWidth(i)}
                            className="btn btn-primary"
                        >
                            {i}px
                        </button>
                    )}
                    <label>{model.currentIndex + 1}/{model.length} - {model.selectedImageId}</label>
                    <label>{model.canvasModel.factor}</label>
                </div>;
    }
}